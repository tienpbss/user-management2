"use strict";
const nodemailer = require("nodemailer");
const { formCategory } = require('../values')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.MAIL_PASSWORD,
    }
});

const emailWorkForm = {
    from: 'Quan ly <foo@example.com>', // sender address
    to: "", // list of receivers
    subject: "Form danh gia thu viec", // Subject line
    text: "Quan ly da tao mot form thu viec cho ban", // plain text body
    html: "<b>Quan ly da tao mot form thu viec cho ban</b>", // html body
}

const emailAnnualForm = {
    from: 'Quan ly <foo@example.com>', // sender address
    to: "", // list of receivers
    subject: "Form danh gia dinh ky hang nam", // Subject line
    text: "Quan ly da tao mot form danh gia dinh ky hang nam cho ban", // plain text body
    html: "Quan ly da tao mot form danh gia dinh ky hang nam cho ban", // html body
}

const main = async (typeForm, emails) => {
    // send mail with defined transport object
    let emailDetail;
    switch (typeForm){
        case formCategory.FORM_WORK: 
            emailDetail = emailWorkForm;
            break;
        case formCategory.FORM_ANNUAL:
            emailDetail = emailAnnualForm;
            break;
    }
    emailDetail.to = emails
    const info = transporter.sendMail(emailDetail);

    console.log(`Send email to ${emails}`);
}

module.exports = main
