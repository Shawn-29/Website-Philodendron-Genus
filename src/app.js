const express = require('express');
const app = express();
const path = require('path');
const connector = require('./connector');
const helmet = require('helmet');

require('express-async-errors');

/* get local environment variables if this app is run in development mode */
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env' });
}

/* middleware */
app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
        directives: {
            ...helmet.contentSecurityPolicy.getDefaultDirectives(),
            'img-src': ['\'self\'', process.env.CDN_ENDPOINT],
            'media-src': [process.env.CDN_VIDEO_ENDPOINT],
            'script-src': '\'self\''
        }
    }
}));
app.use(require('compression')());
app.use(require('express-ejs-layouts'));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/', require('./router'));
app.use(require('./error-handler'));

app.set('port', process.env.PORT);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* app entry point */
const main = async () => {
    await connector.init({
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASS,
        database: process.env.DB,
    });
    app.listen(app.get('port'), () => {
        console.log(`Server running on port ${app.get('port')}.`);
    });
};
main();