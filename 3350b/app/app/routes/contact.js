import Route from '@ember/routing/route';

export default Route.extend({
});

// const nodemailer = require('nodemailer');
// app.use(bodyParser.urlencoded({extended: true}));

// // POST route from contact form
// app.post('/contact', function (req, res) {
//   let mailOpts, smtpTrans;
//   smtpTrans = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//       user: 'hasegawa.sostaric@gmail.com',
//       pass: 'selfstart'
//     }
//   });
//   mailOpts = {
//     from: req.body.name + ' &lt;' + req.body.email + '&gt;',
//     to: 'hasegawa.sostaric@gmail.com',
//     subject: 'New message from contact form at tylerkrys.ca',
//     text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
//   };
//   smtpTrans.sendMail(mailOpts, function (error, response) {
//     if (error) {
//       res.render('contact-failure');
//     }
//     else {
//       res.render('contact-success');
//     }
//   });
// });
