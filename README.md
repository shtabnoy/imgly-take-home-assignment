# Img.ly Assignment

## Description

This is the Img.ly home assingment, an app that fetches a tree structure, 
renders it on the screen, and allows a user to interact with it (e.g., higlight parts of the tree and change the tree structure)

## Libraries and Solutions

### Project stack 

1. It uses basic Vite template react + typescript.
2. Jest, and react-testing-library (RTL) for testing.
3. TanStack Query for data fetching and state management.
4. React DnD Treeview for rendering tree structures and implementing drag-and-drop functionality.

### Motivation

A quick research showed that there are a few libraries that could be used to achieve the assignment goals, e.g.
render a tree structure, higlight its parts and rearrange it by drag-and-drop parts of the tree.

Some of them are 
* react-arborist
* react-d3-tree
* react-dnd-treeview
* react-konva

Due to the assignment timeframe I decided to go with quick-and-easy solution, `react-dnd-treeview`, because it already handles the tree structure in a reliable way, it's very flexible in terms of nodes rendering, it allows styling of the nodes, and last but not least, gracefully manages the drag-and-drop functionality.

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