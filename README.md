# VistaPath Test Project

## Intro
Design a visually appealing and user friendly medical lab workflow system.

## Tech Stack
- React
- ExpressJS
- NodeJS
- PostgreSQL

## Prep
If you haven't already, install Docker and `docker-compose` locally. This will allow you to 
create the nodejs app, database, and front end in one line, `docker-compose up`. (The provided 
docker-compose.yaml file already has many things done for you already - networking, db credentials, 
live code reload for the express and react apps, etc).

We need the node_modules folders locally, so after downloading this repo, first run
```
cd server && npm install && cd ..
cd frontend && npm install && cd ..
```

To run & develop the applications, run:
```
docker-compose up —-build
```
The Express & React app will live reload on each file save.

To stop the app & erase the database, run:
```
docker-compose down
```

_The Express app is running at localhost:3100_

_The React SPA is running at localhost:3000_

## DB Migrations
While docker-compose up is running, in a new terminal run `docker-compose run app bash` to start a bash shell inside the app container. From there, you can run the following migration commands:
- npm run migrate:up will run the migrations.
- npm run migrate:down will roll back the migrations.

## TODOs
- Mock user authentication
- Authenticated routing
- Update existing image item
- Performance test
- Use cloud storage for image upload (e.g. AWS S3)
- Unit testing