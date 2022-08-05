# Fastify Starter Template
This is a fastify starter template with authentication using `JWT` and `bcrypt.js` via `Knex.js`
 
Includes common features like :
- global error handling
- serialization 
- validation
- `helmet`
- `cors` 
- `formdata` 
- `multipart`
- `dotenv`

## Installation Steps

A few installation methods provided below:

### For Docker users :

this is a production image, no pretty logs

```
docker build . -t fastify
docker run -p 3000:3000 -d fastify
```

### Node >= 16, on any machine.

create ```.env``` from ```.env.example``` file and replace with necessary values.
```
npm i 
npm run dev
```

## Project Structure

- everything in fastify is a plugin. u can register them.
- app contains all separated logic
- subdirectories of app contain encapsulated applications 
- handlers take care of request/response data
- services take care of database operations
- schemas define serialization and validation
- plugins are globally available logic
- `this` context is enabled inside handlers by default. arrow functions will break the context.
- database has migrations and schema, used by `knex` commands

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).
