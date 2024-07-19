const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');

// Inicializaciones
const app = express();

// Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars.js')
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Variables Globales
app.use((req, res, next) => {
    next();
});

// Rutas
app.use(require('./routes/index.js'));
app.use(require('./routes/authentication.js'));
app.use('/links', require('./routes/links.js'));

// Publicos
app.use(express.static(path.join(__dirname, 'public')));

// Inciar Servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'))
});