const mongoose = require('mongoose');
const chalk = require('chalk');

const keys = require('../config/keys');

const { database } = keys;

const connectDB = async () => {
    try {
        await mongoose.connect(database.url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        console.log(`${chalk.green('✓')} ${chalk.blue('MongoDB Connected!')}`);
    } catch (error) {
        console.error(error);
    }
}

module.exports = connectDB
