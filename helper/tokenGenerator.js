const jwt =require('jsonwebtoken');
 function createToken(data = {}) {
    return token = jwt.sign(data, 'groot', { expiresIn: '30D' });
}
module.exports={createToken}