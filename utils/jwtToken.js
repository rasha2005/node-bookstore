const jwt = require('jsonwebtoken');


function generateToken(id , email) {
    const payload = {id , email};

    const token =  jwt.sign(payload , process.env.JWT_SECRET , {
        expiresIn: '1h',
      });

    return token;
}

function verifyToken(token) {
    try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
    }catch(err){
        console.log(err);
    }
}


module.exports = {
    generateToken,
    verifyToken
}