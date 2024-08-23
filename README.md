# My Multi-Step Application Form

#### Project Overview
This project is a dynamic web application designed for job applications, built using React, Material UI, Axios, React Router, Formik, and Yup. The application features a multi-step form with comprehensive validation and seamless API integration, demonstrating a robust and user-friendly interface for job applicants. It also features listed jobs which can be applied.

### Key Features
- Login & Registration Pages: Secure authentication for users with role-based access.
- Multistep application form: to store data for each use.
- Navigation Bar: Easily navigate between different pages of the application.
- Job Search & Application: Browse available jobs, apply directly, and view your applications.
- Profile Management: Update your profile and change your password.
- Session Management: Utilizes session tokens for secure user sessions.
- Password Hashing: Uses bcrypt for hashing passwords.
- Backend Integration: Sequelize ORM for PostgreSQL database management. Controllers manage functionality for Experience, Education, Users, Jobs, Files, and Personal Details models.
- Data Fetching: Utilizes React Query (useQuery) for efficient data fetching and caching.
- Role-Based Access: Admin and Candidate roles with different access permissions.
- Job Management: Admins can add new jobs, while candidates can search and apply for them.
- Job Search Filters: Advanced filters for job search functionality.

## Installation

To get started with the application, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/my-application-form.git

2. Navigate to the project directory:
   ```bash
   cd my-application-form
3. Install the required packages:
   Ensure you have Node.js and npm (or Yarn) installed. Then run:

#### Dependencies
This project uses the following npm packages:

- react: A JavaScript library for building user interfaces.
- react-dom: The package for working with the DOM in React.
- react-router-dom: Declarative routing for React.js.
- axios: Promise-based HTTP client for making requests.
- formik: Library for building forms in React with ease.
- yup: Schema builder for runtime value parsing and validation.
- jsonplaceholder: Fake online REST API for testing and prototyping.
- @mui/material: Material UI components for building a modern and responsive UI.
- @emotion/react and @emotion/styled: Styling libraries used by Material UI.
- @tanstack/react-query: For connecting to the database CRUD functions

#### Ensure you have Node.js and npm (or Yarn) installed. Then install the necessary packages:
```bash
npm install react react-dom react-router-dom axios formik yup
```
#### Install backend dependencies and Sequelize ORM:
```bash
npm install sequelize pg bcryptjs express-session
```

#### Install React Query for data fetching:
```bash
npm install react-query
```

#### Ensure you install Material UI for custom styling for grids, forms, containers, textfields etc.
```bash
npm install @mui/material @emotion/react @emotion/styled
```

#### Usage
Run the development server:
```bash
npm start
```

This will start the development server and you can view the application at http://localhost:3000.

#### Navigate through the application:
- Login & Registration: Securely authenticate and register users with role-based access.
- Navigation Bar: Use the navbar to move between the Job Search page, Candidate Home, and Profile pages.
- Job Search: Browse jobs using advanced filters, apply for jobs, and view your applications.
- Profile Page: Edit your profile and change your password.
- Admin Panel: Admins can manage job postings and user roles (accessible via a secure admin interface).
- Use React Router to navigate between different views.
- The form is handled by Formik with Yup for validation.
- Axios & useQuery is used to interact with the sequelize Database.

#### Code Overview
- src/App.js: Main application component that sets up routes and navigation.
- src/components/Form.js: Contains the form implementation using Formik and Yup.
- src/components/NavBar.js: Navigation bar for seamless page transitions.
- src/components/JobSearchFilters.js: Component for advanced job search filters.
- src/api.js: Axios instance configured for API interactions.
- src/controllers: Manages CRUD operations for Experience, Education, Users, Jobs, Files, and Personal Details models.
- src/query.js: Configuration for React Query (useQuery) to handle data fetching.
- src/hooks/auth.js: Handles authentication and authorization, including role-based access control.
  
## Future Enhancements

- Admin Interface: Develop a comprehensive admin interface for job management and user role administration.
- Database Integration: Enhance PostgreSQL integration with advanced features and optimizations.
- User Experience: Improve user experience with additional features such as notifications, advanced search options, and analytics.


## Acknowledgments
This project is a personal initiative by Gabriel Mokhele. Stay tuned for updates and enhancements!


