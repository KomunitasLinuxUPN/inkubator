import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).render('homepage', {
    pageTitle: 'Homepage',
    path: '/',
  });
});

export default router;
