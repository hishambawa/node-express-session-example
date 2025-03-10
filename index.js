const express = require('express')
const session = require('express-session')

const AuthDao = require('./dao/authDao')
const AuthService = require('./services/authService')
const sessionAuthMiddleware = require('./middleware/sessionAuthMiddleware')
const routeAuthMiddleware = require('./middleware/routeAuthMiddleware')

const authDao = new AuthDao()
const authService = new AuthService(authDao)

const app = express()

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// Serve static files
app.use(express.static('views'));

// parse body to json
app.use(express.json())

// handle login page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
});

app.get('/home', routeAuthMiddleware, (req, res) => {
    res.sendFile(__dirname + '/views/home.html');
});

// add api routes
app.get('/api/user', sessionAuthMiddleware, (req, res) => {
    res.status(200).json(req.session.user);
});

app.post('/api/register', async (req, res) => {
    const response = await authService.register(req)
    res.status(response.status).json(response)
});

app.post('/api/login', async (req, res) => {
    const response = await authService.login(req)
    res.status(response.status).json(response)
});

app.post('/api/logout', async (req, res) => {
    const response = await authService.logout(req)
    res.status(response.status).json(response)
});

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});