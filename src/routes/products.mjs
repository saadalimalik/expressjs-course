import { Router } from 'express';

const router = Router();

router.get('/', (request, response) => {
  response.send([{ id: 1, name: 'chicken breast', price: 10.99 }]);
});

export default router;
