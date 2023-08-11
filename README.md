
# How it works

- node ^18.6.0
- express ^4.18.2
- sequelize ^6.32.1

# Set up .env file
```
PORT=3000
JWT_KEY=YOUR_SECRET_KEY
MYSQL_HOST=localhost
MYSQL_USER=YOUR_MYSQL_USER
MYSQL_PASSWORD=YOUR_MYSQL_PASSWORD
MYSQL_DATABASE=YOUR_MYSQL_DATABASE

EMAIL=YOUR_GMAIL
MAIL_PASSWORD= app password create by gmail
```
# Installation and running the app

Install the dependencies:

```bash
$ npm install
```

Use the command below to generate the documentation at project startup:

```bash
$ npm run start-gendoc
```

Use the command below to start the project without generating the documentation:

```bash
$ npm start
```

Use the command below to run project with nodemon

```bash
# In local development
$ npm run dev
```

Run the project and access the documentation at:

[http://localhost:3000/doc](http://localhost:3000/doc)



# Database
Create diagram on erd.dbdesigner.net don't have uuid type => use integer instead
![img of database](user-management_database.png)