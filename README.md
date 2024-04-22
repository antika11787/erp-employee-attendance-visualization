# erp-employee-attendance-visualization

## Table of Contents

- [Overview](#overview)
- [Setup](#setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)

## Overview

This project is implemented to visualize the employee attendance by uploading excel sheet from ERP.

## Setup

For backend and frontend setup, follow these instructions:
1. Enter into the backend folder. create a file named .env and paste the contents of .example.env
- copy and paste the connection string of your local or remote mongodb <connection_string/your_database_name>
- create a jwt secret key [for example: "kasfBHVBLEAUIKVDdsjblczdv"]
2. Enter into the frontend folder and do the same.

### Backend Setup

1. Open the project in VsCode
2. Open a terminal
3. Navigate to the backend folder: cd backend
4. Install dependencies: npm i
5. Install ts-node globally: npm install -g ts-node
6. Run the backend server: npm run dev

### Frontend Setup

1. Open another terminal side by side
2. Navigate to the frontend folder: cd frontend
3. Install dependencies: npm i
4. Run the frontend server: npm run dev
   
## Usage
1. You'll be redirected to the sign up page after clicking on the URL. sign up with your information.
2. Then log in to view the dashboard.
