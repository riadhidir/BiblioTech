import jwt from 'jsonwebtoken';

// get user id from any module
export const getUserId = (req) => {
    const accessToken = req.headers['authorization'];
    try {
        const validToken = jwt.verify(accessToken, "thisisasecretmessage");
        return validToken.id;
    } catch (err) {
        return { error: err }
    }
}