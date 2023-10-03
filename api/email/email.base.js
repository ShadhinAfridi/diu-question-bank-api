module.exports = function (subject, content) {
    return `
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="UTF-8">
          <title>${subject}</title>
          <style>
              /* Common Email Styles */
              body {
                  font-family: Arial, sans-serif;
                  line-height: 1.5;
                  margin: 0;
                  padding: 0;
                  background-color: #f1f1f1;
              }
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #fff;
              }
              .header {
                  text-align: center;
                  margin-bottom: 20px;
              }
              .verification-code {
                  display: inline-block;
                  padding: 10px 20px;
                  font-size: 18px;
                  background-color: #f1f1f1;
                  border-radius: 4px;
              }
              .footer {
                  text-align: left;
                  margin-top: 20px;
              }
              .logo {
                  display: block;
                  margin: 0 auto;
                  text-align: center;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h2>${subject}</h2>
              </div>
              ${content}
              <div class="footer">
                  <p>Best regards,</p>
                  <p>DIU Question Bank<br>diuquestionbank@gmail.com</p>
              </div>
          </div>
      </body>
      </html>
    `;
};
