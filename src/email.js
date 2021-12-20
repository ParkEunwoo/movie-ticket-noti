import nodemailer from 'nodemailer';

export const sendEmail = async (template) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dmsdn.bot@gmail.com',
      pass: 'cgvmoviebot',
    },
  });

  const to = ['mansesjh22@gmail.com', 'dmsdn960@gmail.com'];

  const mailOptions = {
    from: 'dmsdn.bot@gmail.com',
    to,
    subject: '[은우 봇] 영화 상영 정보 알림',
    html: template,
  };

  const info = await transporter.sendMail(mailOptions).catch(console.error);
  console.log('Email Sent: ' + info.response);
}
