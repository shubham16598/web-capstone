import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';

export const Auth =  function(req:Request, res:Response, next:NextFunction) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    console.log(token);
    const decoded:any = jwt.verify(token, `${process.env.JWTSECRET}`);

    req.body.user = decoded.user;
    console.log(req.body.user);
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: 'Token is not valid'});
  }
};