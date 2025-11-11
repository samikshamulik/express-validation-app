const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
    res.render('index', { errors: [], inputData: {} });
});

app.post(
    '/submit',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('email').isEmail().withMessage('Enter a valid email address'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('index', {
                errors: errors.array(),
                inputData: req.body
            });
        }
        res.render('success', { username: req.body.username });
    }
);

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
