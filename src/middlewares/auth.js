const jwt = require('jsonwebtoken');
const segredoprojwt = '019834h01nbfh0gvnu418u3r914h*@#*@(!#(#&$()*#!&(#!e0f8ub1349fun3094ghn1084uijn1934hr9014nt0913u4gbh';

module.exports = (req, res, next) => {
    const token = req.cookies["token"]

    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }

    jwt.verify(token, segredoprojwt, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: 'Token invalid' });
        }

        req.userId = decoded.id;

        return next();
    })
}