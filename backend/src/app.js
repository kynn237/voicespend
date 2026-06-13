// app.js — Point d'entrée VoiceSpend API
require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Permet les requêtes cross-origin
const helmet = require('helmet');  // Sécurise les en-têtes HTTP
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

//Middlewares de sécurité
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting — 100 requêtes / 15 min
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Trop de requêtes, réessayez plus tard.'
});
app.use('/api/', limiter);

//Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    app: 'VoiceSpend API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

//Routes
app.use('/api/auth',     require('./modules/auth/auth.controller'));
app.use('/api/expenses', require('./modules/expense/expense.controller'));

//404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

//Démarrage serveur
app.listen(PORT, () => {
  console.log(`VoiceSpend API démarrée sur le port ${PORT}`);
});

module.exports = app;