import express, { Request, Response } from 'express';
import { searchGoogleMaps } from "./controllers/searchGoogleMaps";

const app = express();
const port = 3000;

app.get('/search', async (req: Request, res: Response) => {
  try {
    const query = req.query.q;
    if (!query) {
      res.status(400).send('Missing query parameter');
      return;
    }
    const data = await searchGoogleMaps(query as string);
    res.json(data);
  } catch (error) {
    res.status(500).send((error as Error).message);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});