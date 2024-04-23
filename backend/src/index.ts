import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { signInWithYC } from './signing-with-yc';

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('🍊');
});

app.post('/login', async (req, res) => {
  try {
    const userData = await signInWithYC(req.body.username, req.body.password);
    return res.status(200).send(userData);
  } catch (err: any) {
    console.error(err);
    return res
      .status(401)
      .send({ message: 'Not Allowed', details: err?.error });
  }
});

app.listen(8080, () => {
  console.log('The application is listening on port 8080!');
});
