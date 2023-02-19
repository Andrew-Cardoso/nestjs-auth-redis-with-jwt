# NestJS Authentication with Redis and JWT

JWT is widely used for auth, but it has issues like the inability to logout a user from the backend, which may cause security problems.

Many developers recommend a second check to a low-latency database for solving this issue. 

The purpose of this project is to test authentication and authorization using Redis alongside JWT, so we can prevent an unwanted user login, even if he has a valid token.

## Stack
  - [NestJS](https://nestjs.com/)
  - [Typescript](https://www.typescriptlang.org/)
  - [Guards](https://docs.nestjs.com/guards)
  - [Redis](https://redis.io/)
  - [JWT](https://jwt.io/)
  - [Thunder Client](https://www.thunderclient.com/)