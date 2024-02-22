// app.js

import express from 'express';
import { config } from 'dotenv';
import axios from 'axios';
import mailchimp from '@mailchimp/mailchimp_marketing';
import { name } from 'ejs';

config({ path: 'process.env' });

const app = express();
const Port = 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Mailchimp API key and audience ID
const apiKey = process.env.MAILCHIMP_API_KEY;
const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

// Openweather API key
// const openWeatherMapApiKey = process.env.OPENWEATHERMAP_API_KEY;

// Initialize Mailchimp SDK
mailchimp.setConfig({
  apiKey: apiKey,
  server: 'us10', // The server prefix us10
});

// Serve index.html on root path
app.get('/', (req, res) => {
  res.render(`index.ejs`);
});

app.get('/services', (req, res) => {
  res.render(`services.ejs`);
});

app.get('/plans', (req, res) => {
  res.render(`plans.ejs`);
});

app.get('/team', (req, res) => {
  res.render(`team.ejs`);
});

app.get('/kaushal_guide', (req, res) => {
  res.render(`kaushal.ejs`);
});

// Weather endpoint
// app.get('/weather', async (req, res) => {
//   const cityName = req.query.city;

//   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${openWeatherMapApiKey}`;

//   try {
//     const response = await axios.get(apiUrl);
//     const data = response.data;

//     const temperature = Math.round(data.main.temp - 273.15); // Convert from Kelvin to Celsius
//     const weatherDescription = data.weather[0].description;
//     res.json({ temperature, weatherDescription });
//   } catch (error) {
//     console.error('Error fetching weather:', error);
//     res.status(500).send('Error fetching weather data');
//   }
// });

// Route to handle subscription form submission
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  try {
    // Add subscriber to Mailchimp audience
    const response = await mailchimp.lists.addListMember(audienceId, {
      email_address: email,
      status: 'subscribed', // Set the status to 'subscribed' to add the subscriber
    });

    console.log('Subscriber added:', response);

    // Respond to the client with a success message
    res.status(200).json({ message: 'Subscription successful' });
  } catch (error) {
    console.error('Error subscribing:', error)
      ;
    // Respond to the client with an error message
    res.status(500).json({ error: 'Subscription failed' });
  }
});

// Start the server
app.listen(Port, () => {
  console.log(`Server running on port ${Port}`);
});
