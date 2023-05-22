# API Example Backend with Clean Code and Node.JS - Rating Businesses

This is a sample API backend created using Clean Code and Node.js (with Express.js) which follows the TDD methodology and sticks to clean code principles. It includes two types of tests: end-to-end and performance tests, ensuring the reliability and stability of the system.

This API is designed as a real-world example of a platform that allows users to create businesses, view and do reviews of the business. Please note that the permission layer is not included in this example, so anyone can insert reviews.

## Frameworks

- TypeScript: 5.0.2
- Node: 18.14.0
- NPM: 9.3.1
- Mongo-memory-server: 8.12.1
- Mongoose: 7.0.3
- Express: 4.18.2
- JEST: 29.5.0
- EsLint: 8.36.0
- Supertest: 6.3.3

## Logical Model

![image](https://github.com/psirdev/apibackend-cleancode/assets/24595118/bfdb5e3f-6d0e-4aa7-bc7b-77f26badfcd0)

## Schema of the API REST

You can see more info on the postman_collection in JSON.

![image](https://github.com/psirdev/apibackend-cleancode/assets/24595118/4d7a5399-51ff-4f1b-8abf-5cbb72bf027c)

## Getting Started

To get started, you will need to clone this repository to your local machine:

`git clone https://github.com/psirdev/apibackend-cleancode.git`

Next, you will need to install the dependencies by running:

`npm install`

This will install all the required dependencies listed in the `package.json` file.

## Prerequisites

Before you start, you will need to have the following installed on your local machine:

- Node.js
- npm

## Running the server

To start the server, you can run:

`npm run dev`

This will start the server in development mode, which will automatically restart the server whenever you make changes to the code.

## Running the tests

To run the tests, you can use the following command:

`npm run test`

This will run the tests using Jest.

## Authors

This project was created by **Pablo Sirvent Jiménez** - [psirdev](https://github.com/psirdev).

## License

This project is licensed under the GPL-3.0 license.
