
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
## Installation

```bash
$ git clone
$ cd user-management2
$ npm install
```

## Running the app

```bash
# In local development
$ npm run dev
```
## Database
Create diagram on erd.dbdesigner.net don't have uuid type => use integer instead
![img of database](user-management_database.png)