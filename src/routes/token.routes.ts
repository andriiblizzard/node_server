import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Router, Request, Response, NextFunction  } from "express";
import { generateRandomString } from "../utils";
import { getTokenAddress, writeTokenAddress } from "../controllers/token.controllers";

dotenv.config();
const router = Router();

const SECRET_KEY = process.env.SECRET_KEY ?? '';

const authenticationJWT = (req: Request, res: Response, next: NextFunction ) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send('Access denied');
  }

  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (error) {
    res.status(401).send('Invalid token');
  }
}

router.post('/', authenticationJWT, async (req: Request, res: Response) => {
  const currentTokenAddress = req.body.current_token_address;
  try {
    const {error, data} = await writeTokenAddress(currentTokenAddress);
    if (error) {
      res.status(500).json(data);
    } else {
      res.status(200).json(data);
    }
  } catch(error) {
    res.status(500).json('Error occured when writing current token address.');
  }
});

router.get('/', authenticationJWT, async (req: Request, res: Response) => {
  try {
    const {error, data} = await getTokenAddress();
    if (error) {
      res.status(500).json(data);
    } else {
      res.status(200).json(data);
    }
  } catch(error) {
    res.status(500).json('Error occured when getting current token address.');
  }
});

router.get('/gen-apikey', async (req, res) => {
  const token = jwt.sign(generateRandomString(20), SECRET_KEY);
  res.status(200).json({
    apiKey: token
  });
})

export {
  router
};
