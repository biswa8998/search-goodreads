This project uses [GoodReads API](https://www.goodreads.com/api) to search for Books using Book Title or Author Name.

## How this application works

- User enters the search key (book title or author name) in the search box.
- To start the search user can use **Enter key** or **Click** on the search icon.
- Once the search is done, book titles will appear in the **Results** panel.
- User can scroll through the list to search for the exact book.
- On click any of the book title, the details of the book will appear below the **Book Details** panel.

## For Development Setup

- Clone the project from github.
- Go to the project directory.
- Run npm install to install the dependencies

## About Development Setup

This project is totally made in React JS. The GoodReads API calls are done using (proxify-url)[https://www.npmjs.com/package/proxify-url] and (axios)[https://www.npmjs.com/package/axios].

## About Testing Setup

I have tried to follow BDD testing for the project.
I have used (jest)[https://www.npmjs.com/package/jest], (chai)[https://www.npmjs.com/package/chai], (enzyme)[https://www.npmjs.com/package/enzyme] and (sinon)[https://www.npmjs.com/package/sinon]

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>

## Deployment

The project is deployed in Heroku (here)[https://lit-beyond-95476.herokuapp.com/]
