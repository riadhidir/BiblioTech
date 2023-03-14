import nodemailer from "nodemailer";

export async function sendEmail(recipient,text){
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "riadhidir5@gmail.com",
      pass: "wsbrnathwjwdummb",
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail(
    {
      from: "riadhidir5@gmail.com", // sender address
      to: recipient, // list of receivers
      subject: "Bibliotech ✔", // Subject line
      text: text, // plain text body
    //   html: "<b>Hello world?</b>", // html body
    },
    (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("email sent : " + info.response);
      }
    }
  );
}
