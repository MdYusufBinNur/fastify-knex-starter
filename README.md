# Fastify Starter Template

This is a fastify starter template with authentication, otp verification using `JWT` and `bcrypt.js` via `Knex.js`

Includes features :

- Auth & OTP verification
- User CRUD & Role
- Global Error Handler with `@fastify/sensible`
- S3 Object Storage
- Rate limiting on Route by IP

## Project Structure

- app contains all separated features
- handlers => app logic only => request sanitization & response data, anonymous functions only
- services => business logic only => database & cache operations, arrow functions only
- schemas => request validation & response serialization

## Installation Steps

### Local: Node >= 16.

create `.env` from `.env.example` file and replace with necessary values. You will need a MySQL or MariaDB database with a Redis instance. You can setup Redis with docker. Then just install and run.

```
npm install
npm run dev
```

### Docker :

this is a production image build, no pretty logs. you will need to provide necessary env values before building image.

```
docker build . -t fastifyapp
docker run -d -p 3000:3000 --name fastifyapp fastifyapp
```
