import nodemailer from "nodemailer";

export const nodemailerEmailVerification = async ({ email, token }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "plunderplunder1@gmail.com",
      pass: "Eliesamaha123",
    },
  });

  const mailOptions = {
    from: "plunderplunder1@gmail.com",
    to: email,
    subject: "Antoine Email Verification ",
    text: token,
    html:
      "<p>Please verify your email by clicking on this <a href='http://localhost:3000/VerifyEmail/" +
      token +
      "'> Link</a> </p>",
  };
  return await transporter.sendMail(mailOptions);
};
