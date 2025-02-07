const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// ✅ Function to correctly calculate digit sum, even for negative numbers
function digitSum(number) {
    // Convert to absolute value, split digits, and sum them
    return Math.abs(number)
        .toString()
        .split('')
        .reduce((sum, digit) => sum + parseInt(digit), 0);
}

// ✅ Your other number classification functions go here
function isPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function isFibonacci(num) {
    let a = 0, b = 1;
    while (b < num) {
        [a, b] = [b, a + b];
    }
    return b === num;
}


// Fetch a fun fact from Numbers API
const getFunFact = async (num) => {
    try {
        const response = await axios.get(`http://numbersapi.com/${num}/math`);
        return response.data;
    } catch (error) {
        return "No fun fact available";
    }
};

// API Endpoint
app.get('/api/classify-number', (req, res) => {
    let { number } = req.query;

    // Validate input: Ensure number is provided and is a valid numeric value
    if (!number || isNaN(number)) {
        return res.status(400).json({ error: "Invalid number" });
    }

    // Convert input to a number
    number = parseFloat(number); 

    // Construct the response object
    const response = {
        number: number,
        digit_sum: digitSum(number),  // ✅ Ensure correct digit sum for negative numbers
        isEven: number % 2 === 0,
        isPrime: isPrime(number),
        isFibonacci: isFibonacci(number),
    };

    // Send the JSON response
    res.json(response);
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
