import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "youremail@gmail.com",
    pass: "yourpassword",
  },
});

const mailOptions = {
  from: "youremail@gmail.com",
  to: "recipientemail@example.com",
  subject: "Sending email using Node.js",
  text: "Hello from Node.js!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});

// outlook

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "youremail@outlook.com",
    pass: "yourpassword",
  },
});

const mailOptions = {
  from: "youremail@outlook.com",
  to: "recipientemail@example.com",
  subject: "Sending email using Node.js",
  text: "Hello from Node.js!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});





// sa etherealom da mi samo da link;   https://nodemailer.com/about/#ethereal   npm install nodemailer

import nodemailer from "nodemailer";

async function main() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.ETHEREAL_EMAIL_USERNAME, // generated ethereal email account user
      pass: process.env.ETHEREAL_EMAIL_PASSWORD, // generated ethereal email account password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "Sender Name <sender@example.com>", // sender address
    to: "Recipient Name <recipient@example.com>", // list of receivers
    subject: "Hello from Ethereal Email", // Subject line
    text: "Hello, world!", // plain text body
    html: "<b>Hello, world!</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
