import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { mockUsers } from './utils/constants.mjs';

// Configuring the environment variables on the process
dotenv.config();

// Initialize the application
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET || 'secret'));
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'secret',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60000 * 60,
        },
    })
);

app.use('/api', routes);

// Setup routes
app.get('/', (request, response) => {
    request.session.visited = true;

    response.cookie('hello', 'world', { maxAge: 1000 * 30, signed: true });
    response.status(201).json({ msg: 'Welcome to the backend;' });
});

app.post('/api/auth', (request, response) => {
    const { username, password } = request.body;
    const findUser = mockUsers.find((user) => user.name === username);

    if (!findUser || findUser.password !== password)
        return response.status(401).send({ msg: 'Invalid Credentials' });

    request.session.user = findUser;
    return response.status(200).send(findUser);
});

app.get('/api/auth/status', (request, response) => {
    return request.session.user
        ? response.status(200).send(request.session.user)
        : response.status(401).send({ msg: 'Not Authenticated' });
});

app.post('/api/cart', (request, response) => {
    if (request.session.user)
        return response.send(401).send({ msg: 'Not Authenticated' });

    const { body: item } = request;
    const { cart } = request.session;

    if (!cart) request.session.cart = [item];
    cart.push(item);

    return response.status(200).send(item);
});

app.get('/api/cart', (request, response) => {
    if (request.session.user)
        return response.send(401).send({ msg: 'Not Authenticated' });

    return response.status(200).send(request.session.cart ?? []);
});

// Setup port for the server
const PORT = process.env.PORT || 3000;

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
