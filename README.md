# Hotel Booking System - Frontend

This is the frontend user interface for the Hotel Booking System, built with React and Vite. It provides a responsive and interactive experience for users to search, view, and book hotels, as well as for hotel owners to manage their listings.

## Features

 - **User Interface**: Clean and responsive design for seamless navigation.
 - **Authentication**: User registration and login forms with secure state management.
 - **Hotel Browsing**: View a list of available hotels with images and details.
 - **Search & Filter**: Search functionality to find hotels by city and filter options.
 - **Booking Management**: Interface to select dates and book hotels.
 - **Dashboard**: User dashboard to view bookings and Owner dashboard to manage hotels.

## Tech Stack

- **Framework**: React
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: Context API / React Hooks

## Installation & Setup

1.  **Navigate to the frontend directory**:
    ```bash
    cd frontend
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root of the `frontend` folder to connect to the backend API.
    ```bash
    # Example API URL (Adjust port if your backend runs elsewhere)
    VITE_API_BASE_URL=http://localhost:5000
    ```

4.  **Run the Development Server**:
    ```bash
    npm run dev
    ```
    The application will typically run at `http://localhost:5173`.

## Usage Instructions

1.  **Register/Login**: Create an account to start booking.
2.  **Search**: Use the search bar to find hotels in your desired city.
3.  **Book**: Click on a hotel to view details and make a reservation.
4.  **Manage**: If you are a hotel owner, use the dashboard to add or update your listings.

## API Connection

This frontend is designed to consume the backend API. Ensure your backend server is running and accessible.

- **Default Backend URL**: `http://localhost:5000`
- **API Endpoints**: The frontend makes requests to endpoints like `/api/auth`, `/api/listings`, and `/api/bookings`.
