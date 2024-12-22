import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
const verifyToken = (token) => {
  try {

    return jwt.verify(token , process.env.SECRET_KEY)
  } catch (error) {
    console.log("error happend while verify token " + error);
  }
};


export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
  
    if (!authHeader)
      return res.status(401).json({
        message: " you are not authorize",
        success: false,
      });
    const token = authHeader.split(" ")[1] 
    const payload = verifyToken(token)
    req.user = payload
    next()
  } catch (error) {
      console.log("error happend on the auhtentiacte middle ware " + error);
      return res.status(401).json({
          message: "error happend in server",
          success: false,
        });
  }
};
