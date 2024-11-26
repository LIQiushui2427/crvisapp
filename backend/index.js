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

  if (!clientId || !clientSecret || !secretId) {
    return res.status(500).json({ error: 'Missing environment variables' });
  }
  const currentTimestamp = Math.floor(Date.now() / 1000);
  // Define JWT header
  const header = {
    kid: secretId,  // Secret ID for the connected app
    alg: 'HS256',   // Signing algorithm
    typ: 'JWT',     // Set typ explicitly to 'JWT'
    iss: clientId,  // Client ID for the connected app
  };

  // Define JWT payload with required claims
  const payload = {
    sub: 's240079@e.ntu.edu.sg',           // Replace with the email of the Tableau Cloud user
    aud: 'tableau',                        // Audience - fixed to "tableau"
    exp: currentTimestamp + 60 * 60,       // Expiration time (1 hour from now)
    jti: uuidv4(),     // Unique identifier for the JWT
    scp: ['tableau:views:embed'],          // Required scope for embedding views
  };

  // Generate the JWT
  try {
    console.log('Generating JWT...');
    console.log('Header:', header);
    console.log('Payload:', payload);
  
    const token = jwt.sign(payload, clientSecret, {
      header,
      noTimestamp: true, // This option prevents 'iat' from being added automatically
    });
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
