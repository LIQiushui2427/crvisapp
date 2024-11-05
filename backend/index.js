// backend/index.js

const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');  // Import cors

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());  // Enable CORS for all routes


app.get('/generate-jwt', (req, res) => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const secretId = process.env.SECRET_ID;
  const issuerUri = process.env.ISSUER_URI;

  if (!clientId || !clientSecret || !secretId || !issuerUri) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }

  // Define JWT header
  const header = {
    kid: secretId,  // Secret ID for the connected app
    alg: 'HS256',   // Signing algorithm
  };

  // Define JWT payload with required claims
  const payload = {
    iss: issuerUri,                      // Issuer URI (unique identifier for your app)
    sub: 's240079@e.ntu.edu.sg',           // Replace with the email of the Tableau Cloud user
    aud: 'tableau',                       // Audience - fixed to "tableau"
    exp: Math.floor(Date.now() / 1000) + 600,  // Expiration time (10 minutes from now)
    jti: uuidv4(),                        // JWT ID, a unique identifier for the token
    scp: ['tableau:views:embed'],         // Scope, for embedding workflows
  };

  // Generate the JWT
  try {
    const token = jwt.sign(payload, clientSecret, { header });
    res.json({ token });
  } catch (error) {
    console.error('Error generating JWT:', error);
    res.status(500).json({ error: 'Error generating token' });
  }
});

app.listen(PORT, () => {
  console.log(`JWT Generator running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('JWT Generator is running.');
  });
