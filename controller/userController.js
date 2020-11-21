const crypto = require('crypto');
const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');
const {
    User
} = require('../models');
const jwt = require('../modules/jwt');
const TOKEN_EXPIRED = -3
const TOKEN_INVALID = -2

module.exports = {
    signup: async (req, res) => {
        const {
            loginId,
            userName,
            password
        } = req.body;

        if (!loginId || !password || !userName) {
            console.log('필요한 값이 없습니다');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }

        try {
            const alreadyID = await User.findOne({
                where: {
                    loginId,
                }
            });

            if (alreadyID) {
                console.log('이미 존재하는 아이디입니다.');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID));
            }

            const salt = crypto.randomBytes(64).toString('base64');
            const hashedPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

            const user = await User.create({
                loginId,
                userName,
                password: hashedPassword,
                salt,
            });

            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS, {
                loginId,
                userName,
                id: user.id
            }));
        } catch (err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_UP_FAIL));
        }
    },

    signin: async (req, res) => {
        const {
            loginId,
            password,
        } = req.body;

        if (!loginId || !password) {
            console.log('필요한 값이 없습니다');
            return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE));
        }

        try {
            const isUser = await User.findOne({
                where: {
                    loginId: loginId,
                },
            });

            if (!isUser) {
                console.log('없는 아이디입니다');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.SIGN_IN_FAIL));
            }

            const {
                id,
                password: savedPassword,
                salt,
            } = isUser;
            const inputPassword = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('base64');

            if(inputPassword !== savedPassword) {
                console.log('비밀번호가 일치하지 않습니다');
                return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW));
            }

            const {
                accessToken,
                refreshToken
            } = await jwt.sign(isUser);

            return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, {
                accessToken,
                refreshToken
            }));
        } catch (err) {
            console.error(err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.SIGN_IN_FAIL));
        }
    }

}
