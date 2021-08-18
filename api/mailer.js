/* eslint-disable no-console */
/* eslint-disable no-prototype-builtins */
// require('dotenv').config()
import nodemailer from 'nodemailer'
// import validator from 'validator'
// import xssFilters from 'xss-filters'

const mailer = (req, res) => {
    try {
        // // Our three form fields, all required
        // // console.log('email subj:', req.body.inputs.title)
        // const attributes = ['name', 'email@mail.com', 'purpose']
        // // Map each attribute name to the validated and sanitized equivalent (false if validation failed)
        // // const sanitizedAttributes = attributes.map(n => req.body[n])
        // // Validate, sanitize and send
        // const validateAndSanitize = (key, value) => {
        //     const rejectFunctions = {
        //         name: v => v.length < 10,
        //         email: v => !validator.isEmail(v),
        //         purpose: v => v.length < 25
        //     }
        //     // If map has key and function returns false, return sanitized input. Else, return false
        //     return rejectFunctions.hasOwnProperty(key) && !rejectFunctions.value && xssFilters.inHTMLData(value)
        // }
        // const sanitizedAttributes = attributes.map(n => validateAndSanitize(n, req.body.inputs[n]))
        // // True if some of the attributes new values are false -> validation failed
        // console.log('sanitizedAttributes:', sanitizedAttributes)

        // const someInvalid = sanitizedAttributes.some(r => !r)
        // if (someInvalid) {
        //     // Throw a 422 with a neat error message if validation failed
        //     return res.status(422).json({ 'error': 'Ugh.. That looks unprocessable!' })
        // } else { console.log('sanitizedAttributes:', sanitizedAttributes) }
        // // sending

        const sendMail = (email, msg) => {
            const transporter = nodemailer.createTransport({
                host: 'mail.gandi.net',
                port: '587',
                secure: false,
                auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PWD }
            })
            // transporter.verify(function(error, success) {
            //   if (error) {
            //       console.log(error);
            //   } else {
            //       console.log('Server is ready to take our messages');
            //   }
            // })    
            transporter.sendMail({
                from: process.env.MAIL_USER,
                to: 'oliver.carvajal@gmail.com',
                subject: 'testing mailer function',
                text: 'dummy body text'
            },
                (error) => {
                    if (error) {
                        console.log("Sending Error:", error);
                    }
                    console.log("Success!");
                }
            )
        }
        sendMail('...sanitizedAttributes')
        res.status(200).json({ 'message': 'OH YEAH' })
    } catch (err) {
        // const errors = errorHandler(err)
        res.status(400).json({ err })
    }
}

export default mailer