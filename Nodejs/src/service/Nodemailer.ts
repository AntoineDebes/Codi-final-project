import nodemailer from "nodemailer";

export const nodemailerEmailVerification = async ({
  email,
  token,
  userName,
}) => {
  const transporter = nodemailer.createTransport({
    service: "Zoho",
    auth: {
      user: process.env.NODEMAIL_EMAIL,
      pass: process.env.NODEMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: "fps@antoinedebes.codes",
    to: email,
    subject: "Antoine Email Verification ",
    text: token,
    html: `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Verify your email address</title>
    <style type="text/css" rel="stylesheet" media="all">
      /* Base ------------------------------ */
      *:not(br):not(tr):not(html) {
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
      }
      body {
        width: 100% !important;
        height: 100%;
        margin: 0;
        line-height: 1.4;
        background-color: #f5f7f9;
        color: #839197;
        -webkit-text-size-adjust: none;
      }
      a {
        color: #414ef9;
      }
      .email-masthead-footer--logo {
        width: 200px;
      }

      /* Layout ------------------------------ */
      .email-wrapper {
        width: 100%;
        margin: 0;
        padding: 0;
        background-color: #f5f7f9;
      }
      .email-content {
        width: 100%;
        margin: 0;
        padding: 0;
      }

      .email-masthead--smaller-img {
        width: 130px;
      }

      /* Masthead ----------------------- */
      .email-masthead {
        padding: 5px 0;
        text-align: center;
      }
      .email-masthead_logo {
        max-width: 400px;
        border: 0;
      }
      .email-masthead_name {
        font-size: 16px;
        font-weight: bold;
        color: #839197;
        text-decoration: none;
        text-shadow: 0 1px 0 white;
      }

      /* Body ------------------------------ */
      .email-body {
        width: 100%;
        margin: 0;
        padding: 0;
        border-top: 1px solid #e7eaec;
        border-bottom: 1px solid #e7eaec;
        background-color: #ffffff;
      }
      .email-body_inner {
        width: 570px;
        margin: 0 auto;
        padding: 0;
      }
      .email-footer {
        width: 570px;
        margin: 0 auto;
        padding: 0;
        text-align: center;
      }
      .email-footer p {
        color: #839197;
      }
      .body-action {
        width: 100%;
        margin: 30px auto;
        padding: 0;
        text-align: center;
      }
      .body-sub {
        margin: 0 auto;
        margin-top: 25px;
        padding-top: 25px;
        border-top: 1px solid #e7eaec;
      }
      .content-cell {
        padding: 35px 35px 5px 35px;
      }
      .align-right {
        text-align: right;
      }

      /* Type ------------------------------ */
      h1 {
        margin-top: 0;
        color: #292e31;
        font-size: 19px;
        font-weight: bold;
        text-align: left;
      }
      h2 {
        margin-top: 0;
        color: #292e31;
        font-size: 16px;
        font-weight: bold;
        text-align: left;
      }
      h3 {
        margin-top: 0;
        color: #292e31;
        font-size: 14px;
        font-weight: bold;
        text-align: left;
      }
      p {
        margin-top: 0;
        color: #839197;
        font-size: 16px;
        line-height: 1.5em;
        text-align: left;
      }
      p.sub {
        font-size: 12px;
      }
      p.center {
        text-align: center;
      }

      /* Buttons ------------------------------ */
      .button {
        display: inline-block;
        width: 200px;
        background-color: #414ef9;
        border-radius: 3px;
        color: #ffffff;
        font-size: 15px;
        line-height: 45px;
        text-align: center;
        text-decoration: none;
        -webkit-text-size-adjust: none;
        mso-hide: all;
      }
      .button--green {
        background-color: #28db67;
      }
      .button--red {
        background-color: #ff3665;
      }
      .button--blue {
        background-color: #414ef9;
        color: white !important;
      }

      /*Media Queries ------------------------------ */
      @media only screen and (max-width: 600px) {
        .email-body_inner,
        .email-footer {
          width: 100% !important;
        }
      }
      @media only screen and (max-width: 500px) {
        .button {
          width: 100% !important;
        }
      }
    </style>
  </head>
  <body>
    <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table
            class="email-content"
            width="100%"
            cellpadding="0"
            cellspacing="0"
          >
            <!-- Logo -->
            <tr>
              <td class="email-masthead">
                <img
                  src="https://fps.antoinedebes.codes/logo--dark.svg"
                  class="email-masthead--smaller-img"
                />
              </td>
            </tr>
            <!-- Email Body -->
            <tr>
              <td class="email-body" width="100%">
                <table
                  class="email-body_inner"
                  align="center"
                  width="570"
                  cellpadding="0"
                  cellspacing="0"
                >
                  <!-- Body content -->
                  <tr>
                    <td class="content-cell">
                      <h1>Verify your email address</h1>
                      <p>Welcome ${userName}</p>
                      <p>
                        Thanks for signing up for FPS! We're excited to have you
                        as a user.
                      </p>
                      <p>
                        Please click the button below to confirm your E-mail
                        address registered in your FPS account.
                      </p>
                      <!-- Action -->
                      <table
                        class="body-action"
                        align="center"
                        width="100%"
                        cellpadding="0"
                        cellspacing="0"
                      >
                        <tr>
                          <td align="center">
                            <div>
                              <a href="https://fps.antoinedebes.codes/verifyemail/${token}" class="button button--blue"
                                >Verify Email</a
                              >
                            </div>
                          </td>
                        </tr>
                      </table>
                      <p>Best Regards,<br />FPS Team</p>
                      <!-- Sub copy -->
                      <tr>
                        <table class="body-sub">
                          <tr>
                            <td>
                              <p class="sub">
                                If you’re having trouble clicking the button,
                                copy and paste the URL below into your web
                                browser.
                              </p>
                              <p class="sub">
                                <a href="${token}">${token}</a>
                              </p>
                            </td>
                          </tr>
                        </table>
                      </tr>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
  };
  return await transporter.sendMail(mailOptions);
};
