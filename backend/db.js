const mongoose = require('mongoose');
const mongoURI =
  'mongodb://localhost:27017/db_notebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

const connectToMongo = async () => {
  mongoose.connect(mongoURI, error => {
    !error ? console.log('connected to mongo sucessfully') : console.log(error);
  });
};

module.exports = connectToMongo;
