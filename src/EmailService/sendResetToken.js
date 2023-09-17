const ejs = require("ejs");
const mssql = require("mssql");
const { sqlConfig } = require("../Config/config");
const { sendMail } = require("../utils/email");



module.exports.sendResetToken= async (email,token) => {
            const message = {
              from: process.env.EMAIL_USER,
              to: email,
              subject: `LinkUp Password Reset`, 
              text: `Click on this link to reset your password http://localhost:4500/auth/verify-token/${token}/kaybernard449@gmail.com`
            };
            try {
              
              await sendMail(message);
              console.log('sent email to user');
              
            } catch (error) {
              console.log(error);
            }
  };


