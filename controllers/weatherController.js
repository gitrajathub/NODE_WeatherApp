const nodemailer = require('nodemailer');
const mongoose = require("mongoose");
const https = require('https');

//get weather ---------------------------------------

exports.getWeather = async (req, res) => {
    const {cityName}= req.body;
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.API_KEY}`;

    https.get(apiUrl, (response) => {
        let data = '';

        response.on('data', (chunk) => {
        data += chunk;
        });

        response.on('end', () => {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp - 273.15;
            res.send(`Temperature in ${cityName}: ${temperature.toFixed(2)}°C`);

            
        });
    })
    .on('error', (error) => {
        console.error(error);
        res.status(500).send('Error occurred');
    });
};


//send email ---------------------------------------

exports.sendWeatherToEmail = async (req, res) => {
    const {email, cityName}= req.body;
    console.log(email, cityName);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.API_KEY}`;

    https.get(apiUrl, (response) => {
        let data = '';

        response.on('data', (chunk) => {
        data += chunk;
        });

        response.on('end', () => {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp - 273.15;
            res.send(`Temperature in ${cityName}: ${temperature.toFixed(2)}°C`);

            try{
                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                      user: process.env.gmail, 
                      pass: process.env.gmail_password 
                    }
                });
                const mailOptions = {
                    from: process.env.gmail, 
                    to: email, 
                    subject: 'Temprature',
                    text: `Temperature in ${cityName}: ${temperature.toFixed(2)}°C`
                  };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      console.error('Error occurred:', error);
                    } else {
                      console.log('Email sent:', info.response);
                    }
                });
            }
            catch{
                res.status(500).send('Error in sending email');
            }
        });
    })
    .on('error', (error) => {
        console.error(error);
        res.status(500).send('Error occurred');
    });
};
