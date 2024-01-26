# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

Before run project you should configure your OpenWeather api key in `.env.local` based on `.env.example`

You have two options to run project: with docker or locally:

### 1. With Docker

`docker build -t guigallo/weather .`\
`docker run --env-file .env.local -p 8080:80 guigallo/weather`

### 2. Locally

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

# TO DO

feature not implemented yet:
- [ ] weather forecast
- [ ] tests
- [ ] toastr to display errors
