# Ednitha Craft Server

## Table of contents 📄

- [Ednitha Craft Server](#ednitha-craft-server)
  - [Table of contents 📄](#table-of-contents-)
  - [Overview :writing_hand:](#overview-writing_hand)
    - [Installation :gear:](#installation-gear)
  - [Express Router and Routes](#express-router-and-routes)
    - [Basic example **Create User** `/api/user/register`:](#basic-example-create-user-apiuserregister)
    - [Built with 🛠️](#built-with-️)
  - [Author 👊](#author-)

## Overview :writing_hand:

REST API for Ednitha Craft. This repository contains the backend structure and the link to the deployed API on Render: [Deployed Project](https://ednitha-craft-server.onrender.com).". The application connects to a user interface developed with Nextjs. Here is the link to the frontend repository: [Frontend Repository](https://github.com/Cristianjs93/ednitha-craft-app).

### Installation :gear:

To get started with the project, follow these steps:

1. Clone the repository:

```shell
git clone https://github.com/Cristianjs93/ednitha-craft-server
```

2. Navigate to the project directory:

```shell
cd ednitha-craft-server
```

3. Install the dependencies:

```shell
 npm install
```

4. Start the application:

```shell
 npm run dev
```

## Express Router and Routes

| Route                              | HTTP Verb | Description                |
| ---------------------------------- | --------- | -------------------------- |
| /api/healthcheck                   | GET       | Healthcheck                |
| /api/user                          | GET       | List all users             |
| /api/user/email                    | GET       | Find a user by email       |
| /api/user/register                 | POST      | Register a user            |
| /api/user/update                   | PUT       | Update user information    |
| /api/user/delete                   | DELETE    | Delete a user              |
| /api/product                       | GET       | List all products          |
| /api/product/create                | POST      | Create a product           |
| /api/product/update                | PUT       | Update product information |
| /api/product/delete                | DELETE    | Delete a product           |
| /api/review                        | GET       | List all reviews           |
| /api/review/create                 | POST      | Create a review            |
| /api/review/update                 | PUT       | Update review information  |
| /api/review/delete                 | DELETE    | Delete a review            |
| /api/auth/local/verify/:resetToken | GET       | Verify an account          |
| /api/auth/local/login              | POST      | Log in                     |

### Basic example **Create User** `/api/user/register`:

Request Body (FormData):

```json
{
  "email": "jd123@test.com",
  "name": "John",
  "lastname":"Doe",
  "password": "Jdoe1234",
  "avatar": [file] (png, jpg, jpeg)
}
```

Response:

```json
{
  "message": "User created successfully",
  "data": {
    "name": "John",
    "lastname": "Doe",
    "email": "jd123@test.com",
    "avatar": "avatarUrl",
    "role": "USER",
    "active": false,
    "reviews": [],
    "createdAt": "2023-11-28T21:32:17.952Z",
    "updatedAt": "2023-11-28T21:32:17.952Z"
  }
}
```

Verified email:

```json
{
  "message": "Account successfully activated",
  "token": "eyYleNlrnaPLnM3KlDcM5rYafCWTHx5jLP9.eyKKSONBNOREJjoobomebOIewvjewKNVOIWEEWVjoILjbaIibogOAriaEmvlToodMbPsnVRjgYr.l8HQLurn8Cm3SNMuyvn_YE7b83jfdn3wMLMAprABfPr",
  "data": {
    "name": "John",
    "lastname": "Doe",
    "email": "jd123@test.com",
    "avatar": "avatarUrl",
    "role": "USER",
    "active": true,
    "reviews": [],
    "createdAt": "2023-11-28T21:32:17.952Z",
    "updatedAt": "2023-11-28T21:36:45.105Z"
  }
}
```

### Built with 🛠️

- Built with Node.js and Express
- Typescript
- MongoDB
- REST API

## Author 👊

This project was created by [Cristianjs93](https://github.com/Cristianjs93).
