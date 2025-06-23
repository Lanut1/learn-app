# Learn Platform

Learn Platform is a full-stack training management web application that allows users to register, log in, manage their profile, assign trainers, and manage trainings. The application is built with a NestJS backend using AWS DynamoDB and a React frontend using Vite and Material UI. The app is deployed using AWS Amplify, App Runner and integrates secure authentication with JWT and HTTP-only cookies.

**Live Demo:** [https://main.d11d2jd4n93nmx.amplifyapp.com/](https://main.d11d2jd4n93nmx.amplifyapp.com/)

---

## Technologies Used

### Frontend

- React (with Vite)
- TypeScript
- Material UI (MUI)
- Joi validation

### Backend

- NestJS
- AWS DynamoDB
- JWT with HTTP-only cookies for auth
- Jest (key routes coverage)

### DevOps

- AWS Amplify (frontend deployment)
- App Runner (backend deployment)
- Docker (for local development)

---

## Core Features

### User Authentication

- User registration and login
- Secure JWT tokens stored in HTTP-only cookies
- Protected routes and session validation on the backend

### Profile Management

- View and edit user profile details
- Update personal information, change password, delete account

### Trainer Management

- Add new trainers from a list
- View assigned trainers in the profile

### Training Assignment

- Add and assign customized trainings to selected trainers
- Display assigned trainings for the user

---
