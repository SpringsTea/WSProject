const Form = {
	path:  process.cwd() + '/public/pdfs/WGPNA.pdf',
	typesplit: false,
	lang: 'EN',
	cardtypes: [null],
	fields: {
		DeckName: 'Deck Name',
		Quantity: (i) => `Qty${i+1}`,
		Code: (i) => `ID${i+1}`,
		Level: (i) => ``,
		Name: (i) => `CardName${i+1}`
	}
}

export default Form;