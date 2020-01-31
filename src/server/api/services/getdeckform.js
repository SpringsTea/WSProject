'use strict';
const fs = require('fs');
const fontkit = require('@pdf-lib/fontkit');
const {
  PDFDocument,
  PDFArray,
  PDFHexString,
  PDFNumber,
  breakTextIntoLines,
  PDFOperator,
  degrees,
  drawLinesOfText,
  PDFOperatorNames: Ops,
  PDFName,
  rgb,
  StandardFonts,
  asPDFName,
  PDFContentStream,
  pushGraphicsState,
  popGraphicsState,
} = require('pdf-lib');

const getAcroForm = pdfDoc => {
  return pdfDoc.catalog.lookup(PDFName.of('AcroForm'));
};

const getAcroFields = pdfDoc => {
  const acroForm = getAcroForm(pdfDoc);
  if (!acroForm) return [];

  const fieldRefs = acroForm.lookupMaybe(PDFName.of('Fields'), PDFArray);
  if (!fieldRefs) return [];

  const fields = new Array(fieldRefs.size());
  for (let idx = 0, len = fieldRefs.size(); idx < len; idx++) {
    fields[idx] = fieldRefs.lookup(idx);
  }
  return fields;
};

const findAcroFieldByName = (pdfDoc, name) => {
  const acroFields = getAcroFields(pdfDoc);
  return acroFields.find(acroField => {
    const fieldName = acroField.get(PDFName.of('T'));
    return !!fieldName && fieldName.value === name;
  });
};

const fillAcroTextField = (acroField, text, font, multiline = false) => {
  const rect = acroField.lookup(PDFName.of('Rect'), PDFArray);
  const width =
    rect.lookup(2, PDFNumber).value() - rect.lookup(0, PDFNumber).value();
  const height =
    rect.lookup(3, PDFNumber).value() - rect.lookup(1, PDFNumber).value();

  const N = multiline
    ? multiLineAppearanceStream(font, text, width, height)
    : singleLineAppearanceStream(font, text, width, height);

  acroField.set(PDFName.of('AP'), acroField.context.obj({ N }));
  acroField.set(PDFName.of('Ff'), PDFNumber.of(1 /* Read Only */));
  acroField.set(PDFName.of('V'), PDFHexString.fromText(text));
};

const beginMarkedContent = tag =>
  PDFOperator.of(Ops.BeginMarkedContent, [asPDFName(tag)]);

const endMarkedContent = () => PDFOperator.of(Ops.EndMarkedContent);

const singleLineAppearanceStream = (font, text, width, height) => {
  const size = 12;
  // const lineWidth = font.widthOfTextAtSize(text, fillingSize);
  const lines = [font.encodeText(text)];
  const x = 0;
  const y = height - size;
  return textFieldAppearanceStream(font, size, lines, x, y, width, height);
};

const multiLineAppearanceStream = (font, text, width, height) => {
  const size = 9;
  // const lineWidth = font.widthOfTextAtSize(text, fillingSize);
  const textWidth = t => font.widthOfTextAtSize(t, size);
  const lines = breakTextIntoLines(text, [' '], width, textWidth).map(line =>
    font.encodeText(line),
  );
  const x = 0;
  const y = height - size;
  return textFieldAppearanceStream(font, size, lines, x, y, width, height);
};

const textFieldAppearanceStream = (font, size, lines, x, y, width, height) => {
  const dict = font.doc.context.obj({
    Type: 'XObject',
    Subtype: 'Form',
    FormType: 1,
    BBox: [0, 0, width, height],
    Resources: { Font: { F0: font.ref } },
  });

  const operators = [
    beginMarkedContent('Tx'),
    pushGraphicsState(),
    ...drawLinesOfText(lines, {
      color: rgb(0, 0, 0),
      font: 'F0',
      size: size,
      rotate: degrees(0),
      xSkew: degrees(0),
      ySkew: degrees(0),
      x: x,
      y: y,
      lineHeight: size + 2,
    }),
    popGraphicsState(),
    endMarkedContent(),
  ];

  const stream = PDFContentStream.of(dict, operators);

  return font.doc.context.register(stream);
};

import GetDeckById from '../helpers/get-deck-by-id'
import Forms from '../../config/forms';
/** 
 * @module GetDecKForm
 */

/**
 * Generates a PDF Filled entry form
 * 
 * @param {object} request HTTP request
 * @param {object} response HTTP response
 * @param {function} next function callback
 */

const filterCardQuantity = (cards) =>{
    return cards.reduce( (a,b) => {
        var i = a.findIndex( x => x._id === b._id);
        return i === -1 ? a.push({ ...b, quantity : 1 }) : a[i].quantity++, a;
    }, []);
}

module.exports = async (req, res, next) => {
    const Form = req.params.formtype ? Forms[req.params.formtype] : Forms.BSNA;
    
    const notoFontBytes = await fs.readFileSync('../../../public/fonts/arial-unicode-ms.ttf')
    const pdfDoc = await PDFDocument.load(fs.readFileSync(Form.path));
    pdfDoc.registerFontkit(fontkit);
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman, { subset: true });
    const notoFont = await pdfDoc.embedFont(notoFontBytes, { subset: true });

    const fillInField = (fieldName, text, font, multiline = false) => {
        const field = findAcroFieldByName(pdfDoc, fieldName);
        if (!field) throw new Error(`Missing AcroField: ${fieldName}`);
        fillAcroTextField(field, text, font, multiline);
    };

    if(!Form){
        res.status(500).json({
            success: false,
            message: 'Form Type incorrect'
        });
        return false;
    }

    let Deck = await GetDeckById(req.params.deckid, {
        populate: true,
        view: false,
        lean: true
    });

    if(!Deck){
        res.status(500).json({
            success: false,
            message: 'Deck was not found'
        });
        return false;
    }
    let DeckName = Deck.name;
    let Cards = filterCardQuantity(Deck.cards).sort( (a,b) => {//sort by sid
        if(a.level < b.level) { return -1; }
        if(a.level > b.level) { return 1; }
        if(a.type < b.type) { return -1; }
        if(a.type > b.type) { return 1; }
        return 0;
    })

    fillInField([Form.fields.DeckName], DeckName, timesRomanFont, true)

    Form.cardtypes.map( (type) => {
        let TypeCards = Cards;

        if( type ){
            TypeCards = Cards.filter( (card) => card.cardtype === type)
        }

        TypeCards.map( (card, i) => {
            const locale = card.locale[Form.lang].name ? Form.lang : 'NP';
            const quantity = type ? Form.fields[type].Quantity(i) : Form.fields.Quantity(i);
            const code = type ? Form.fields[type].Code(i) : Form.fields.Code(i);
            const level = type ? Form.fields[type].Level(i) : Form.fields.Level(i);
            const name = type ? Form.fields[type].Name(i) : Form.fields.Name(i);
            
            //console.log(quantity, code, level, name)

            fillInField(quantity, card.quantity, timesRomanFont)
            fillInField(code, `${card.set}/${card.side}${card.release}${ card.side && card.release ? '-' : '' }${card.sid} ${card.rarity}`, timesRomanFont)
            fillInField(level, card.level, timesRomanFont)
            fillInField(name, card.locale[locale].name, locale !== 'JP' ? timesRomanFont : notoFont, true)
        })
    })

    try {
        const pdfBytes = await pdfDoc.save();
        const pdfBuffer = Buffer.from(pdfBytes.buffer, 'binary');
        res.setHeader('Content-Disposition', 'attachment; filename=' + `${Deck.name}.pdf`);
        res.type("application/pdf");
        res.send(pdfBuffer);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: error,
            message: 'something went wrong'
        });
    }
}