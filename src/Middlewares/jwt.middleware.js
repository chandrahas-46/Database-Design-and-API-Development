import jwt from "jsonwebtoken";

const jwtAuth = (req, res, next) => {
    // 1. Read the token
    // console.log(req.headers);
    const token = req.headers['authorization'];
    // console.log(token);

    // 2. If no token, return the error.
    if(!token){
        return res.status(401).send('Unauthorized');
    }

    // 3. check if token is valid
    try{
        const payload = jwt.verify(token, "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz");
        console.log("jwt payload: ",payload);
        req.userID = payload.userID    // Used it in {cartItems.controller.js} $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        // req.msg = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    } catch(err){
        // 4. return error
        console.log("JWT ERROR: ",err);
        return res.status(401).send('Unauthorized')
    }

    // 5. call next middleware
    next();
}

export default jwtAuth;