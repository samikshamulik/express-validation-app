// app.js
const express = require('express');
const path = require('path');
const { body, validationResult } = require('express-validator');

const app = express(); // ✅ This creates the Express app instance

// Middleware
app.use(express.urlencoded({ extended: false }));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.get('/', (req, res) => {
  res.render('index', { errors: [], name: '', email: '' });
});

app.post(
  '/submit',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be 6+ characters'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('index', { errors: errors.array(), ...req.body });
    }

    // If validation passes, show success page
    res.render('success');
  }
);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
