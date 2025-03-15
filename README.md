# Login Logout System

This project is a simple Node.js-based authentication system that handles user login and logout functionalities. It includes user authentication, environment configuration, and API endpoints for authentication.

## Features
- User authentication (login/logout)
- Environment configuration using `.env`
- API endpoints for authentication
- Modular structure with controllers

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/login-logout-system.git
   ```
2. Navigate to the project directory:
   ```sh
   cd login-logout-system
   ```
3. Install dependencies:
   ```sh
   npm install
   ```

## Usage

1. Create a `.env` file based on `.env.sample` and configure your environment variables.
2. Start the server:
   ```sh
   npm start
   ```
3. The application will run on `http://localhost:3000` by default.

## File Structure
```
login-logout-system/
│-- .env
│-- .gitignore
│-- package.json
│-- package-lock.json
│-- readme.md
│-- src/
│   │-- app.js
│   │-- constants.js
│   │-- index.js
│   │-- controllers/
│       │-- user.controller.js
```

## Contributing
Feel free to open issues and submit pull requests.

## License
This project is licensed under the MIT License.

