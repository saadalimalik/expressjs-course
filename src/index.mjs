import express, { response } from 'express';
import dotenv from 'dotenv';

// Configuring the environment variables on the process
dotenv.config();

// Initialize the application
const app = express();

const mockUsers = [
  { id: 1, name: 'anthony', displayName: 'Anthony', job: 'developer' },
  { id: 2, name: 'john', displayName: 'John', job: 'project_manager' },
  { id: 3, name: 'emilia', displayName: 'Emilia', job: 'marketing_manager' },
];

// Setup routes
app.get('/', (request, response) => {
  response.status(201).json({ msg: 'Welcome to the backend;' });
});

// -User Routes
app.get('/api/users', (request, response) => {
  const {
    query: { filter, value },
  } = request;

  if (filter && value) {
    return response.send(
      mockUsers.filter((user) => {
        return user[filter]?.includes(value);
      })
    );
  }

  return response.send(mockUsers);
});

app.get('/api/users/:id', (request, response) => {
  const parsedId = parseInt(request.params.id);

  if (isNaN(parsedId)) {
    return response.status(400).send({ msg: 'Bad Request. Invalid ID.' });
  }

  const userFound = mockUsers.find((user) => user.id === parsedId);

  if (!userFound) {
    return response.sendStatus(404);
  }

  return response.send(userFound);
});

// Setup port for the server
const PORT = process.env.PORT || 3000;

// Starting the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
