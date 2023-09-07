const ejs = require("ejs");
const mssql = require("mssql");
const { sqlConfig } = require("../Config/config");
const { sendMail } = require("../utils/email");



module.exports.sendResetToken= async (email,token) => {
            const message = {
              from: process.env.EMAIL_USER,
              to: email,
              subject: `LinkUp Password Reset`,
              text: `Please use the token we've sent you to change your password. \n Token: ${token}`
            };
            try {
              
              await sendMail(message);
              console.log('sent email to user');
              
            } catch (error) {
              console.log(error);
            }
  };


