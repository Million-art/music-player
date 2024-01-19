import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = process.env.PORT || 3001;
const prisma = new PrismaClient();

app.use(express.json());

app.post('/songs', async (req: Request, res: Response) => {
  const { title, artist, album, genre } = req.body;

  try {
    const newSong = await prisma.song.create({
      data: { title, artist, album, genre },
    });

    res.json(newSong);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add other CRUD operations...

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
