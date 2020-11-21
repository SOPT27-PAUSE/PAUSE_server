const util = require('../modules/util');
const responseMessage = require('../modules/responseMessage');
const statusCode = require('../modules/statusCode');

const { Usage } = require('../models');
const { User } = require('../models');


module.exports = {
    readUsageTime: async (req, res) => {
        try {
            const UserId = req.decoded.id;
            console.log(UserId);


            // const usage = await Usage.findAll({
            //     where: {
            //         UserId : UserId
            //     },
            // })
            
            
            const usage = await Usage.findAll({
                where : {
                    UserId: UserId
                },
                limit:7,
                order: [['date',  'DESC']]
            });
            console.log(usage[0].date.getDate());

            var usageArray = new Array();

            for(var i = 0; i<usage.length; i++) {
                const usageTime = {
                    date : usage[i].date.getDate(),
                    setTime : usage[i].setTime,
                    useTime : usage[i].useTime
                }
                usageArray.push(usageTime)
            }

            res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.USAGE_TIME_SUCCESS, usageArray));
        } catch(error) {
            res.status(statusCode.INTERNAL_SERVER_ERROR).send(util.fail(statusCode.INTERNAL_SERVER_ERROR, responseMessage.USAGE_TIME_FAIL));
        }
    }
}