const {
  Router
} = require('express')

const router = Router();

const {
  initTracer
} = require('../helper/tracing');
const SERVICE_NAME = "Order Service";
const TRACER = initTracer(SERVICE_NAME);
const INFO = "Order Information";

const {
  Tags,
  FORMAT_HTTP_HEADERS
} = require('opentracing');

router.get('/orders/:userId', async (req, res) => {

  let {
    userId
  } = req.params;

  let userIdInt = parseInt(userId);

  /* -- TRACER INFORMATION  -- */
  const parentSpanContext = TRACER.extract(FORMAT_HTTP_HEADERS, req.headers)
  const span = TRACER.startSpan(`HTTP_GET_UserOrderInfoByUserId - ${userIdInt}`, {
    childOf: parentSpanContext,
    tags: {
      [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER
    }
  });

  try {

    span.setTag("INFO: ", INFO);
    let INFO_STRING = `Order Information requested by user id : , ${userIdInt}!`;
    span.log({
      event: "JSON-format",
      value: INFO_STRING,
    });

    let responseData = {
      "orders": [{
          "orderId": 1,
          "orderAmount": 250,
          "orderDate": "14-Apr-2020"
        },
        {
          "orderId": 2,
          "orderAmount": 450,
          "orderDate": "15-Apr-2020"
        }
      ]
    };

    INFO_STRING = `Order Information requested by user id : , ${userIdInt} and order details - ${JSON.stringify(responseData)}!`;
    span.log({
      event: "JSON-format",
      value: INFO_STRING,
    });
    span.finish();

    res.status(200).send(responseData);

  } catch (error) {
    console.log(error);
    let INFO_STRING = `Order Information requested by user id  : , ${userIdInt} , error - ${JSON.stringify(error)}!`;
    span.log({
      event: "JSON-format",
      value: INFO_STRING,
    });
    span.finish();
  }

});

module.exports = router;