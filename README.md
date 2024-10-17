# Img.ly Assignment

## Description

This is the Img.ly home assingment, an app that fetches a tree structure, 
renders it on the screen, and allows a user to interact with it (e.g., higlight parts of the tree and change the tree structure)

## Libraries and Solutions

### Project stack 

1. It uses basic Vite template react + typescript.
2. Jest, and react-testing-library (RTL) for testing.
5. TanStack Query for data fetching and state management.

## Testing

For testing purposes Jest and React-testing-library (RTL) are used.

The tests are located in the `src/App.test.tsx file`.

To run the tests execute this command

```
yarn test
```

## API

The app fetches data from the following API endpoint:
```
https://ubique.img.ly/frontend-tha
```
which is stored in the `.env` file as `VITE_IMGLY_API_URL`

### API calls

The actual API calls to the endpoints are done with HTML `fetch`, and located in the `src/api` folder.