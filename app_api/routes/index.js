const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken'); // Enable JSON Web Tokens

const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.sendStatus(401);
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.sendStatus(401);
    }

    const token = parts[1];

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.auth = verified;

        return next();
    } catch (err) {
        console.log("JWT Error:", err.message);
        return res.sendStatus(401);
    }

    console.log(process.env.JWT_SECRET);
    console.log(jwt.decode(token));
    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if(err)
        {
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.auth = verified; // Set the auth param to the decoded object
    });
    next(); // We need to continue or this will hang forever
}

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);

router
    .route("/trips")
    .get(tripsController.tripsList)
    .post(authenticateJWT, tripsController.tripsAddTrip);

router
    .route("/trips/:tripCode") 
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip);

router
    .route('/login')
    .post(authController.login);

    module.exports = router;