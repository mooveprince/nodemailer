var nodemailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');
var express = require('express');
var mustache = require ('mustache');
var fs = require('fs');
var app     = express();

  // specify jade template to load
// var template = process.cwd() + '/subscribed.html';
var template = process.cwd() + '/rateChangeMail.html';

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

fs.readFile(template, 'utf8', function (err, file) {
    if (err) {
        
    } else {
        var html = mustache.to_html(file, {oldValue: '60.05', newValue: '61.00'});
    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'Xoomer Admin <ratecheckxoomer@gmail.com>', // sender address
        bcc: 'mooveprince@gmail.com',
        subject: 'Rate Changed', // Subject line
        text: 'Hello world ✔', // plaintext body
        html: html // html body
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
    }
});
            
   
    
    res.send('Check your console!')    
});

app.listen('3000')
console.log('Port on 3000');