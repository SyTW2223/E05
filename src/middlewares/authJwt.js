import { Request, Response, NextFunction } from 'express';
import { Secret, JwtPayload, verify } from 'jsonwebtoken';
require('dotenv').config();

export const CustomRequest = string | JwtPayload;

/**
 * Función que verifica el Token JWT
 */
const authenticateToken = async (req, res, next) => {
  try {
    const token = req.header('authorization')?.replace('Bearer ', '');
    
    if (!token) {
      throw new Error();
    }
    
    const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET);
    CustomRequest.token = decoded;
 
    next();
  } catch (err) {
    res.status(401).send('Please authenticate.');
  }
}

export default authenticateToken;