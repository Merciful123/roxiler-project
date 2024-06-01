 

# This project is a full-stack web application for managing and visualizing transaction data. The application consists of a backend RESTful API built with Node.js and Express and mongoDB, and a frontend interface built with React Js.

## Table of Contents

### local host backend base URL :- http://localhost:4040/api/transaction
### deployed backend base URL :-   https://roxiler-project-gv4j.onrender.com

 

## Features

- **Backend**: Node.js, Express, Mongoose
  - Initialize the database with sample data
  - List transactions
  - Get transaction statistics
  - Retrieve bar chart and pie chart data
  - Combine data for statistical and graphical representation

- **Frontend**: React, Axios
  - User interface to display transaction list
  - Visualize statistics using charts
  - Interactive elements for data retrieval

## Installation

 
## Backend

### Setup

1  cd backend
    
2. Install dependencies:
    
   npm install
  

3. Set up environment variables:
   Create a `.env` file in the backend directory and add the necessary environment variables ( MongoDB connection string and PORT).

4. Start the backend server:

   npm start
   
### API Endpoints

#### Initialize Database

- **URL:** `/initialize`
- **Method:** `GET`
- **Description:** Initializes the database with sample data.
- **Response:**
  ```json
  {
    "message": "Database initialized successfully"
  }
  ```

#### List Transactions

- **URL:** `/list`
- **Method:** `GET`
- **Description:** Lists all transactions.
- **Response:**
  ```json
  [
    {
      "id": 1,
      "title": "Transaction 1",
      "price": 100,
      "description": "Description of transaction 1",
      "category": "Category 1",
      "dateOfSale": "2023-05-01T00:00:00.000Z",
      "sold": true
    },
    ...
  ]
  ```

#### Get Statistics

- **URL:** `/statistics`
- **Method:** `GET`
- **Description:** Retrieves transaction statistics.
- **Response:**
  ```json
  {
    "totalTransactions": 10,
    "totalSales": 1000,
    "averageSalePrice": 100
  }
  ```

#### Get Bar Chart Data

- **URL:** `/barchart`
- **Method:** `GET`
- **Description:** Retrieves data for a bar chart.
- **Response:**
  ```json
  {
    "labels": ["Category 1", "Category 2"],
    "data": [500, 500]
  }
  ```

#### Get Pie Chart Data

- **URL:** `/piechart`
- **Method:** `GET`
- **Description:** Retrieves data for a pie chart.
- **Response:**
  ```json
  {
    "labels": ["Sold", "Unsold"],
    "data": [5, 5]
  }
  ```

#### Get Combined Data

- **URL:** `/combined`
- **Method:** `GET`
- **Description:** Retrieves combined data for statistics, bar chart, and pie chart.
- **Response:**
  ```json
  {
    "statistics": {
      "totalTransactions": 10,
      "totalSales": 1000,
      "averageSalePrice": 100
    },
    "barChart": {
      "labels": ["Category 1", "Category 2"],
      "data": [500, 500]
    },
    "pieChart": {
      "labels": ["Sold", "Unsold"],
      "data": [5, 5]
    }
  }
  ```

## Frontend

### Setup

1. Navigate to the frontend directory:
  
   cd frontend
  
2. Install dependencies:
 
   npm install
 

3. Start the frontend development server:
   
   npm start
   

### Available Scripts

In the frontend directory, you can run:

- Change the API request end point from frontend as request API is set to deployed URL in my case.

- npm start: Runs the app in the development mode.

