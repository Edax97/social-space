const jst = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const unToken = jst.verify(token, 'acsdjncanjkcasjkjksacnakjsc');
        req.userData = {mail: unToken.mail, id: unToken.id};
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: 'Youre not authenticated.'
        })
    }
    
}