const express = require('express');
const app = express();

app.use(express.json());

const user = {
    user_id: "anshika_gupta_17091999",
    email: "anshika.gupta2021@vitbhopal.ac.in",
    roll_number: "21BCE10652"
};

// POST method
app.post('/bfhl', (req, res) => {
    const data = req.body.data;
    const numbers = [];
    const alphabets = [];
    let highestLowercase = null;

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (/[a-zA-Z]/.test(item)) {
            alphabets.push(item);
            if (/[a-z]/.test(item) && (!highestLowercase || item > highestLowercase)) {
                highestLowercase = item;
            }
        }
    });

    res.json({
        is_success: true,
        ...user,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
    });
});

// GET method
app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
