require('dotenv').config();
const chalk = require('chalk');

const app = require('./app')
const keys = require('./config/keys');

const { port } = keys;

app.listen(port, () => {
    console.log(
        `${chalk.green('✓')} ${chalk.blue(
            `Listening on port ${port}. Visit http://localhost:${port}/ in your browser.`
        )}`
    );
});
