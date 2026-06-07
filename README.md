# Members Only
The goal of this project was to create a message board app using passport sessions in Node.js using Express, EJS, Express-Validator, PostgreSQL, Passport and Bcryptjs.

## Features
1. Home page that displays all messages in the database when user is logged in.
2. Shows only the author and timestamp that the message was created unless the logged in user is a member or admin.
3. Shows a delete button for each message only when user is an admin.
4. Login and Registration pages for new and existing users.
5. New message page for users to add messages to the database.
6. Secret code page to upgrade membership from user -> member or admin (codes for both are 'member' and 'admin' respectively).

## Installation

Before installing, ensure you have the following software installed:
**Git**: [Download Git](https://git-scm.com)
**Node.js**: [Download Node.js](https://nodejs.org)
**postSQL**: [Download postSQL](https://www.postgresql.org/)

1. **Clone the repository**
```git clone https://github.com/thall34/inventory-application```
2. **Navigate to the project directory**
```cd clone-location/inventory-application```
3. **Initialize project to create package.json**
```npm init -y```
4. **Install dependencies**
```npm install express ejs express-validator pg express-session passport passport-local bcryptjs```
5. **Configure .env file in project folder and add a DATABASE_URL variable**
```DATABASE_URL=postgresql://<your-role-name>:<your-role-password>@localhost:5432/members_only```
6. **Create local database**
```psql -> CREATE DATABASE members_only -> \q``` then ```node --env-file=.env db/populatedb.js``` to populate the database with appropriate tables
7. **Start the local server**
```node --env-file=.env app.js```
8. **Navigate to the localhost in your browser**
```http://localhost:3000```

## Future improvements

Add more colour to website using CSS
Implement a cookie to keep user logged in over refreshes for a specified amount of time