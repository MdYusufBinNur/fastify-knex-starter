# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)
This project was bootstrapped with Fastify-CLI.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

For production mode

## Project Structure

- app contains all separated logic
- subdirectories of app contain encapsulated applications 
- handlers take care of request/response data
- services take care of database operations
- schemas define serialization and validation
- plugins are globally available logic
- routes are encapsulated logic
- `this` context is enabled inside handlers by default. arrow functions will break the context.
- database has migrations and schema, used by `knex` commands

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).
