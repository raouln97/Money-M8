// src/middleware/auth.middleware.ts
import { Request } from "express";
import jwt from "jsonwebtoken";

export function expressAuthentication(
  req: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  return new Promise((resolve, reject) => {
    const token = req.cookies ? req.cookies.accessToken : null;

    if (!token) {
      reject(new Error("No token provided"));
    }

    jwt.verify(token, process.env.SUPABASE_JWT_KEY, (err, decoded) => {
      if (err) {
        reject(new Error("Failed to authenticate token"));
      } else {
        // The 'decoded' object should have the same properties you expect in 'Express.User'
        resolve(decoded);
      }
    });
  });
}
