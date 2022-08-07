# StoreFact Project

A project to store stories and facts build on React, Node and Postgres
## Getting Started

The repo contains Code for frontend and backend API.


## How to Setup Backend for project:

1) Run "npm i" to install all the modules

2) Setup te Datbase: \
   -- "sudo -u postgres psql" to open postgres terminal \
   -- "CREATE USER <username> WITH PASSWORD <password>;" to create the user. \
   -- "CREATE DATABASE <database_name>;" to create the new database. \
   -- "\c <database_name>" to connect to newly created databse \
   -- "GRANT ALL PRIVILEGES ON DATABASE <database_name> to <username>;" to grant the permission. \
   -- "\q" to come out of the postgres terminal. \

3) Create .env File inside project folder with following details: \
   DATABASE_NAME=<database_name> \
   DATABASE_HOST=<database_hostname> \
   DATABASE_USERNAME=<database_username> \
   DATABASE_PASSWORD=<database_password> \
   DATABASE_PORT=<database_port>  \
   JWTSECRET=<database_JWTSecret> \
   SALTROUND=<SALT_ROUND>  
   
4) Run Command : "db-migrate up -m ./migrations/ --config ./config/database.json" to run the migrations.  

OR

4) Up environment:
   npm run db:create

5) "npm run start" to start the server.   

6) "npm run test" for testing the apis.   