import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/index.mjs';

// Configuring the environment variables on the process
dotenv.config();

// Initialize the application
const app = express();

// Middleware to handle incoming JSON data
app.use(express.json());

// Setup routes
app.get('/', (request, response) => {
  response.status(201).json({ msg: 'Welcome to the backend;' });
});

app.use('/api', routes);

// Setup port for the server
const PORT = process.env.PORT || 3000;

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
