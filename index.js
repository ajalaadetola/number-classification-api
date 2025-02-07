const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Function to check if a number is prime
const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
    }
    return true;
};

// Function to check if a number is an Armstrong number
const isArmstrong = (num) => {
    const digits = num.toString().split("").map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    return sum === num;
};

// Function to check if a number is perfect
const isPerfect = (num) => {
    let sum = 1;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            sum += i;
            if (i !== num / i) sum += num / i;
        }
    }
    return sum === num && num !== 1;
};

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
app.get("/api/classify-number", async (req, res) => {
    const { number } = req.query;

    // Validate input
    if (!number || isNaN(number)) {
        return res.status(400).json({ error: "Invalid number" });
    }

    const num = parseInt(number);
    const properties = [];

    if (isArmstrong(num)) properties.push("armstrong");
    properties.push(num % 2 === 0 ? "even" : "odd");

    const funFact = await getFunFact(num);

    // ✅ Fix: Ensure digit_sum is numeric, even for negative numbers
    const digitSum = Math.abs(num)  // Remove negative sign
        .toString()
        .split("")
        .reduce((sum, digit) => sum + parseInt(digit), 0);

    // ✅ Extra validation to ensure digit_sum is numeric
    if (isNaN(digitSum)) {
        return res.status(400).json({ error: "digit_sum must be numeric (failed on negative input)" });
    }

    res.json({
        number: num,
        is_prime: isPrime(num),
        is_perfect: isPerfect(num),
        properties,
        digit_sum: digitSum,  // ✅ Now always a valid number!
        fun_fact: funFact
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
