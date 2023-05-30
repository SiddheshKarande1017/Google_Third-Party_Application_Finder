const { google } = require('googleapis');
const express = require('express');
const app = express();
//const app = express();
const ejs = require('ejs');
const path = require('path');
app.set('views', path.join(__dirname, 'views'));

// Set the view engine
app.set('view engine', 'ejs');

const oauth2Client = new google.auth.OAuth2(
    "840301833265-gst4u8l51u3qtj9s21sjklcn2egc09s4.apps.googleusercontent.com",
    "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",
    ["http://localhost:3000/auth/google/callback"]
);

var m='';

app.get("/", (req, res) => {
  //const applications = [];
  res.render('index', { msg: m});
  
});

app.get('/auth/google', (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/plus.login'],
  });
  res.redirect(authUrl);
});

app.get('/auth/google/callback', (req, res) => {
  const code = req.query.code;
  oauth2Client.getToken(code, (err, tokens) => {
    if (err) {
      // Handle error
      console.error('Error retrieving access token:', err);
    } else {
      const article=[];
      oauth2Client.setCredentials(tokens);
      //const applications = [];
      m="Authentication successful!";
      res.render('index', { msg: m});

      // res.sendFile(__dirname + "/index.html");
      
    }
  });
});

app.get('/applications', (req, res) => {
  const apiKey = 'AIzaSyB2TGS_hRtC2ee1eTzKq67fyfkJ9_j8YgI'; // actual API key
  const plus = google.plus({ version: 'v1', auth: apiKey });
  plus.people.list({
    userId: 'me',
    collection: 'people',
    auth: oauth2Client,
    fields: 'items(id, displayName, emails)',
  }, (err, response) => {
    if (err) {
      // Handle error
      console.error('Error retrieving authorized applications:', err);
      res.status(500).json({ error: 'An error occurred while retrieving applications.' });
    } else {
      const applications = response.data.items;
      const scopes = oauth2Client.credentials.scope;
      const accessTime = oauth2Client.credentials.expiry_date;
      const applicationsWithScopesAndTime = applications.map(application => {
        return {
          id: application.id,
          displayName: application.displayName,
          emails: application.emails,
          scopes: scopes,
          accessTime: accessTime
        };
      });
      res.render('home', { applications: applicationsWithScopesAndTime });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

