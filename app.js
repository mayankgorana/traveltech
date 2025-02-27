import express from 'express';
import { config } from 'dotenv';
import mailchimp from '@mailchimp/mailchimp_marketing';
import pg from 'pg';

config({ path: 'process.env' });

const app = express();
const Port = 3000;

const db = new pg.Client({
  user: 'postgres',
  password: "12345",
  database: "travelTech",
  host: "localhost",
  port: 5432
});

db.connect();

let packages = [];

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Mailchimp API key and audience ID
const apiKey = process.env.MAILCHIMP_API_KEY;
const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

// Initialize Mailchimp SDK
mailchimp.setConfig({
  apiKey: apiKey,
  server: 'us10', // The server prefix us10
});

app.get('/', (req, res) => {
  res.render(`index.ejs`);
});

app.get('/services', (req, res) => {
  res.render(`services.ejs`);
});

app.get('/team', (req, res) => {
  res.render(`team.ejs`);
});

app.get('/contact', (req, res) => {
  res.render(`contact.ejs`);
});

app.get('/packages', async (req, res) => {
  const result = await db.query("SELECT * FROM packages");
  const packages = result.rows;
  res.render("packages.ejs", { packages: packages });
  // console.log(packages);

});

app.get('/packages/:heading', async (req, res) => {
  const result = await db.query("Select * FROM packages WHERE heading = $1", [req.params.heading]);
  const packages = result.rows[0];
  console.log(result.rows[0]);
  res.render("uniquePackage.ejs", {package : packages});
})

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
