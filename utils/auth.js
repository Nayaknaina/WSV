const jwt = require('jsonwebtoken');
const { logIncollection } = require('../src/db/conn');

const generateToken = async (user) => {
    const payload = {
      id: user._id,
      name: user.name,
      email: user.email
    };
  
    // Ensure that the environment variable is defined in your variable
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in the environment variable.");
    }
  
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '60d',
    });
  
    return token;
  };
  

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies["360Followers"];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await logIncollection.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Plaese Authenticate' });
  }
};




module.exports = { generateToken, authenticate };