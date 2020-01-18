const Form = {
	path:  process.cwd() + '/public/pdfs/BSNA.pdf',
	typesplit: true,//Form seperates card types
	lang: 'EN',
	cardtypes: ['CH', 'EV', 'CX'],
	fields: {
		DeckName: 'DeckName',
		CH: {
			Quantity: (i) => `CHCard${i+1}Q`,
			Code: (i) => `CHCard${i+1}Code`,
			Level: (i) => `CHCard${i+1}Level`,
			Name: (i) => `CHCard${i+1}Name`
		},
		EV: {
			Quantity: (i) => `EVCard${i+1}Q`,
			Code: (i) => `EVCard${i+1}Code`,
			Level: (i) => `EVCard${i+1}Level`,
			Name: (i) => `EVCard${i+1}Name`
		},
		CX: {
			Quantity: (i) => `CXCard${i+1}Q`,
			Code: (i) => `CXCard${i+1}Code`,
			Level: (i) => `CXCard${i+1}Level`,
			Name: (i) => `CXCard${i+1}Name`
		}
	}
}

export default Form;