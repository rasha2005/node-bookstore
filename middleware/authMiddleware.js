const {verifyToken} = require('../utils/jwtToken');

async function authenticateToken(req , res , next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    const token = authHeader.split(' ')[1];

    try{

        const decodedToken = verifyToken(token);

        req.user = {
            userId: decodedToken.id,
            email: decodedToken.email
          };
      
          next();

    }catch(err) {

    }
}

module.exports = authenticateToken;