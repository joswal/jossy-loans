require('express-async-errors');
const app = require('express')();
require('./startup/routes')(app);

process.on('uncaughtException', (ex) => {
    console.log('WE GOT AN UNCAUGHT EXCEPTION')
})
process.on('unhandledRejection', (ex) => {
    console.log('WE GOT AN UNHANDLED EXCEPTION');
    process.exit(1);
})

const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;