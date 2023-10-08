import router from './routes';

const express = require('express');

const app = express();
const port = 1245;

app.use('/', router);

app.listen(port, () => {
  console.log(`My app is listening on port ${port}`);
});

export default app;
