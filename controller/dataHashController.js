const jwt =require('jsonwebtoken');
const dataHandlerController = {
     checkToken: function(req, res, next) {
        const token = req.headers["token"];
        console.log(token);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const [Bearer, tokenValue] = token.split(' ');
        if (Bearer !== 'Bearer' || !tokenValue) {
            return res.status(401).json({ message: 'Invalid token format' });
        }
        // verify token
        jwt.verify(tokenValue, 'groot', function (err, decoded) {
            if (err) {
                return res.status(401).json({ message: 'Token validation failed' });
            }
            req.user = decoded;
            console.log("token verified successfully");
            next();
        });
    }
}
 
module.exports = dataHandlerController;