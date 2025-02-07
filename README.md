# Number Classification API

## Overview
The **Number Classification API** is a simple RESTful API that takes a number as input and returns various mathematical properties, including:
- **Prime number check**
- **Perfect number check**
- **Armstrong number check**
- **Odd/Even classification**
- **Sum of digits**
- **Fun fact from the Numbers API**

## Features
- Accepts **GET** requests with a number parameter.
- Returns a JSON response with detailed number classifications.
- Fetches a fun fact from the [Numbers API](http://numbersapi.com/).
- Handles CORS for cross-origin requests.

## API Endpoint
### **GET /api/classify-number?number=371**

### Example Response (200 OK):
```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

### Error Response (400 Bad Request):
```json
{
    "number": "alphabet",
    "error": true
}
```

## Installation & Setup
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd number-classification-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the server locally:
   ```sh
   node index.js
   ```
   The API will be available at `http://localhost:3000/api/classify-number`.

## Deployment
The API is deployed on **Render** and can be accessed at:
```
<your-deployed-url>/api/classify-number?number=371
```

## Technologies Used
- **Node.js** with **Express.js** for the backend
- **Axios** for making API calls
- **CORS** for handling cross-origin requests
- **Render** for cloud deployment

## Contributing
1. Fork the repository.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to your fork and submit a Pull Request.

## License
This project is licensed under the MIT License.

