import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectToDB, disconnectToDB } from './config/db.config';
import { router } from './routes/token.routes';

dotenv.config();

(async () => {
  await connectToDB();

  const app = express();
  
  const PORT = process.env.PORT ?? 5000;
  
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(router);
  
  app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
  })
})();
