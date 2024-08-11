// src/middleware/auth.middleware.ts
import { Request } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
  userId?: string; // Add userId as an optional string
}

export function expressAuthentication(
  req: CustomRequest,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  return new Promise((resolve, reject) => {
    // console.log("Req", req);
    const token = req.cookies ? req.cookies.accessToken : null;

    if (!token) {
      reject(new Error("No token provided"));
    }

    jwt.verify(token, process.env.SUPABASE_JWT_KEY, (err, decoded) => {
      if (err) {
        reject(new Error("Failed to authenticate token"));
      } else {
        // The 'decoded' object should have the same properties you expect in 'Express.User'
        const userId = (decoded as any).sub; // Replace 'sub' with the correct field if different
        req.userId = userId;
        resolve(decoded);
      }
    });
  });
}
