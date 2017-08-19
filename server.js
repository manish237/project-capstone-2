const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const app = express();

const authRouters = require('./routers/authRouters');
const userDataRouters = require('./routers/userDataRouters');
const extDataRouters = require('./routers/extDataRouters');

mongoose.Promise = global.Promise;
const {PORT, DATABASE_URL} = require('./config');

// log the http layer
app.use(express.static('public'));
app.use(morgan('common'));


app.get("/", (request, response) => {
  response.sendFile(__dirname + '/public/index-1.html');
});

app.use('/auth', authRouters);
app.use('/user', userDataRouters);
app.use('/extdata', extDataRouters);
app.use(expressSession({secret:"max",saveUninitialized:false,resave:false}))


let server;
//
// server = app.listen(process.env.PORT || 8080, () => {
//     console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
// });


function runServer(databaseUrl=DATABASE_URL, port=PORT) {
    return new Promise((resolve, reject) => {
        mongoose.connect(databaseUrl,
            {
                useMongoClient: true
            }, err => {
            if(err) {
                console.log("unable to connect to the DB")
                return reject(err);
            }
            server = app.listen(port, () => {
                console.log(`Your app is listening on port ${port}`);
                resolve();
            }).on('error', err => {
                mongoose.disconnect();
                reject(err)
            });
        });
    });
}

function closeServer() {
    return mongoose.disconnect().then(() => {
        return new Promise((resolve, reject) => {
            console.log('Closing server');
            server.close(err => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    });
}

if (require.main === module) {
    runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
