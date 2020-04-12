const {
    Router
} = require('express')

const router = Router();
const {
    User
} = require('../models/index');

const {
    initTracer
} = require('../helper/tracing');
const SERVICE_NAME = "User Service";
const TRACER = initTracer(SERVICE_NAME);
const INFO = "User Information";

const {
    Tags,
    FORMAT_HTTP_HEADERS
} = require('opentracing');


router.get('/users/:userId', async (req, res) => {

    let {
        userId
    } = req.params;

    let userIdInt = parseInt(userId);

    /* -- TRACER INFORMATION  -- */
    const parentSpanContext = TRACER.extract(FORMAT_HTTP_HEADERS, req.headers)
    const span = TRACER.startSpan(`HTTP_GET_UserInfoById - ${userIdInt}`, {
        childOf: parentSpanContext,
        tags: {
            [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER
        }
    });

    try {

        span.setTag("INFO: ", INFO);
        let INFO_STRING = `User Information requested by user id : , ${userIdInt}!`;
        span.log({
            event: "JSON-format",
            value: INFO_STRING,
        });

        let user = await User.findByPk(userIdInt);

        if (!user) {
            return res.sendStatus(404);
        }

        INFO_STRING = `User Information requested by user id : , ${userIdInt} and user - ${JSON.stringify(user)}!`;
        span.log({
            event: "JSON-format",
            value: INFO_STRING,
        });

        let responseData = {
            name: user.name,
            age: user.age,
            email: user.email
        };

        span.finish();
        return res.status(200).send(responseData);

    } catch (error) {
        console.log(error);
        let INFO_STRING = `User Information requested by user id  : , ${userIdInt} , error - ${JSON.stringify(error)}!`;
        span.log({
            event: "JSON-format",
            value: INFO_STRING,
        });
        span.finish();
        return res.sendStatus(500);
    }

});

module.exports = router;