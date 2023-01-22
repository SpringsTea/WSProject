const nodemailer = require('nodemailer');

const logto = 'shawn.springstead@gmail.com'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: 'encoredecks@gmail.com',
        clientId: process.env.MAIL_CLIENTID,
        clientSecret: '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',
        refreshToken: '1//04FcCh6bEcGV7CgYIARAAGAQSNwF-L9IrZvVcixZHaHH7c-reRt7eIbIlb6fDSR-YDLUURqtHeprejyZl0KczwfR1mUJZ05DNV6c',
    }
})  


const log = (text, subject = 'Encore Log') => {

	const email = {
	    to: logto,
	    from: 'encoredecks@gmail.com',
	    subject: subject,
	    text: text
	}

	console.log(text)

	transporter.sendMail(email);
}

module.exports = log;
