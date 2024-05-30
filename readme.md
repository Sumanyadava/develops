# Attendance portal

A web app for employees and and admin to manage Attendance

## Demo

link to demo -

## Run Locally

### Run Client

1. Clone the project:

   ```bash
   git clone https://github.com/Sumanyadava/develops.git
   ```

2. Navigate to the project :

   ```bash
   cd develops
   ```

3. Navigate to the client directory:

   ```bash
   cd client
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the client:

   ```bash
   npm run dev
   ```

### Run Server

1. Open another terminal window and navigate to the project directory:

   ```bash
   cd develops
   ```

2. Navigate to the server directory:

   ```bash
   cd server
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm run start
   ```

5. If you encounter any issues, install nodemon:

   ```bash
   npm i -D nodemon
   ```

6. Run the server in development mode:

   ```bash
   npm run dev
   ```

## Support

For support, email - ansum2411@gmail.com

## For better understanding

- [WorkFlow || Site map](https://excalidraw.com/#json=aFshEN21HaSjeCpCOWuic,Mv7hmvnUP0eZawSu83mHqw)

## Features

- 3 level logins

  -
  - Employee: Basic access for standard employees.
  - HR: Human Resources functionalities.
  - Admin: Full administrative access.

- **Authentication & Authorization**: Secure login system ensuring proper access controls.
- **User Management**:

  - **Create**: Add new users to the system.
  - **Read**: View user information.
  - **Update**: Edit existing user details.
  - **Delete**: Remove users from the system.
  - **Search Users**: Efficiently find users based on various criteria.

- **Attendance Tracking**:

  - **Check In / Check Out**: Record the start and end of work shifts.
  - **Punctuality**: Monitor and report on employee punctuality.
  - **Working Hours**: Track and calculate total working hours for employees.

- **Data Export**:
  - **Dynamic Export to Excel**: Export data tailored to different roles, with specific formats for HR and Employees.
- **Mobile Responsive**: Optimized for viewing on mobile devices.
- **Auto Login**: Automatically logs in users on returning visits.
- **Dark Theme**: Option to switch to a dark color scheme for better usability in low-light environments.

## Tech Stack

**Client:** React, TailwindCSS , Daisy UI , react-csv , React Router Dom , js-cookie , react-toastify

**Server:** Node, Express , mongoose , bcryptjs , mongoose

**Database:** MongoDB

## Authors

- [@Sumanyadava](https://github.com/Sumanyadava)
