const bcrypt = require("bcrypt");
const {
  generateToken
} = require("../helpers/auth.helper");
const { GeneralResponse } = require("../utils/response");
const { GeneralError, UnAuthorized } = require("../utils/error");
const contactModel = require("../models/contact.model");
const config = require("../utils/config");
const { sentMailSync, sentMail } = require('../helpers/mail.helper');
const saltRounds = 10;

exports.contact = async (req, res, next) => {
  try {
    let { name, email, mobile , comment } = req.body;
            contactModel.createcontact(
              { name, email, mobile,comment },
              (err, response) => {
                if (err || response.affectedRows == 0)
                  next(new GeneralError("Contact failed"));
                else
                sentMailSync({
                    from: process.env.MAIL_FROM_DEFAULT_ID,
                    to: email,
                    subject: `Contact for Your ${process.env.APP_NAME}`,
                    html: `<p>Hello ` + name +`,</p><p> Thank you for contact us. Admin will contact you as soon as possible.</p>Thank you,<br>Your ${process.env.APP_NAME}.`
                  }, (err, info) => {
                    console.log(err)
                    if (err) next(new GeneralError("Contact email failure"));
                    else
                         next(
                              new GeneralResponse(
                              "Contact successfully you have receive one email from our side.",
                              undefined,
                              config.HTTP_CREATED
                              )
                         );
                    });
              });
  } catch (err) {
    next(new GeneralError("Contact failed"));
  }
};
