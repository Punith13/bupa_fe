# BUPA FE Code challenge

This README file provides instructions on how to run a Vite FE application located in the `client` directory and a server located in the `server` folder. The server includes npm run start and test commands.

## Prerequisites

Before you can run the Vite app and the server, please make sure you have the following prerequisites installed on your system:

- Node.js: You can download and install Node.js from [nodejs.org](https://nodejs.org/).

## Start Dev Application server - Frontend

1. Open a terminal and navigate to the project's root directory.

2. Change into `client` directory by running the following command:

`cd client`

3. Install the dependencies by running the following command:

`npm install`

4. Start the Vite application by running the following command:

`npm run dev`

This command will start the development server for the Vite application. You can access the app in your web browser at `http://localhost:5173`.

5. To build the Vite application for production, you can use the following command:

`npm run build`

This will create an optimized production build in the `dist` directory.

## Running the Server

1. Navigate to the `server` folder using your terminal:

`cd server`

2. Install the server's dependencies by running the following command:

`npm install`

3. Start the server by running the following command:

`npm run start`

This will start the server, and it should be accessible at `http://localhost:4000`.

## Docker

The application can also be run using docker. A nginx container splits traffic between the Front end and Graphql API requests
To build and access the application , run the following commands

```
docker-compose build
docker-compose up
```

Website is available at localhost

## Running Tests

To run tests for the Front end client application, from the root directory you can use the following command:

```
cd client
npm run test
```

To run tests for the server application, from the root directory you can use the following command:

```
cd server
npm run test
```

This command will execute the tests for the server and provide feedback on the test results.

## Husky pre-commit hook

The husky pre commit hook is also configured which checks the linting and runs the unit test before commiting the code.

## Output

Desktop - All books

![All Desktop books](images/all_desktop.png)

Desktop - Hardcover only books

![Hardcover Desktop books](images/hardcover_desktop.png)

Mobile - All books

![All Mobile books ](images/all_mobile.png)

Mobile - Hardcover only books

![Hardcover Mobile books](images/hardcover_mobile.png)

## License

[MIT](https://choosealicense.com/licenses/mit/)
