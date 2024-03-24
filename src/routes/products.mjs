import { Router } from 'express';

const router = Router();

router.get('/', (request, response) => {
  if (request.signedCookies.hello && request.signedCookies.hello === 'world')
    return response.send([{ id: 1, name: 'chicken breast', price: 10.99 }]);

  return response
    .status(403)
    .send({ msg: 'Sorry. You need correct cookie to access this resource.' });
});

export default router;
