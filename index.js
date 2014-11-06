var nodemailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');
var express = require('express');
var app     = express();

app.get('/sendmail', function(req, res){
    // create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport(smtpPool({
        service: 'Gmail',
        auth: {
            user: 'ratecheckxoomer@gmail.com',
            pass: 'rate@xoom123'
        },
        maxConnections: 3,
        maxMessages: 10        
    }));

    // NB! No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Xoomer Admin <ratecheckxoomer@gmail.com>', // sender address
        bcc: 'mooveprince@gmail.com, mooveprince2@gmail.com', // list of receivers
        subject: 'Rate Changed', // Subject line
        text: 'Hello world ✔', // plaintext body
        html: '<b>Hello world ✔</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        console.log ("Sending Emails dude...");
        if(error){
            console.log(error);
        }else{
            console.log('Message sent: ' + info.response);
        }
    });    
    
    res.send('Check your console!')    
});

app.listen('3000')
console.log('Port on 3000');