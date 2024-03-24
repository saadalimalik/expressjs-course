import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';

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

// Setup port for the server
const PORT = process.env.PORT || 3000;

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
