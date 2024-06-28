const nodemailer = require("nodemailer");

// Hàm gửi email
const sendMail = async ({ email, html, subject }) => {
  // Tạo transporter với cấu hình SMTP
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Sử dụng host SMTP của nhà cung cấp email
    port: 587, // Cổng SMTP (587 là cổng thông thường cho TLS)
    secure: false, // True cho cổng 465, false cho các cổng khác
    auth: {
      user: process.env.EMAIL_NAME, // Địa chỉ email của bạn
      pass: process.env.EMAIL_APP_PASSWORD, // Mật khẩu email của bạn
    },
  });

  // Cấu hình email
  let mailOptions = {
    from: '"LH MarketPlace" <no-relply@LHMarketPlace.com>', // Địa chỉ người gửi
    to: email, // Địa chỉ người nhận
    subject: subject, // Chủ đề email
    html: html, // Nội dung email
  };

  // Gửi email
  let info = await transporter.sendMail(mailOptions);

  return info;
};

module.exports = sendMail;
