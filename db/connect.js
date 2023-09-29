const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose
    .connect(url)
    .then(() => console.log('mongo ok!'))
    .catch((err) => console.log(err));
};

module.exports = connectDB;

