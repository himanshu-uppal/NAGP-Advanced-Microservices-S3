const {
  Router
} = require('express');
const request = require('request');

const router = Router();

const SERVICE_URLS = {
  USER_SERVICE_URL: process.env.USER_SERVICE_URL || "localhost:9000",
  ORDER_SERVICE_URL: process.env.ORDER_SERVICE_URL || "localhost:9001"
}

const {
  initTracer
} = require('../helper/tracing');
const SERVICE_NAME = "Aggregate Service";
const TRACER = initTracer(SERVICE_NAME);
const INFO = "Aggregate Information";

const {
  Tags,
  FORMAT_HTTP_HEADERS
} = require('opentracing');

let headers = {};

router.get('/orderdetails/:id', async (req, res) => {


  let {
    id
  } = req.params;

  let userIdInt = parseInt(id);

  /* -- TRACER INFORMATION  -- */
  const parentSpanContext = TRACER.extract(FORMAT_HTTP_HEADERS, req.headers)
  const span = TRACER.startSpan(`HTTP_GET_OrderDetailsWithUserByUserId - ${userIdInt}`, {
    childOf: parentSpanContext,
    tags: {
      [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER
    }
  });

  try {

    span.setTag("INFO: ", INFO);
    let INFO_STRING = `Order Information with user information requested by user id : , ${userIdInt}!`;
    span.log({
      event: "JSON-format",
      value: INFO_STRING,
    });

    TRACER.inject(span, FORMAT_HTTP_HEADERS, headers);



    let userDetails = await getUserDetails(id);

    if (!userDetails) {

      INFO_STRING = `User info requested by user id : , ${userIdInt} and no user details found - ${JSON.stringify(userDetails)}!`;
      span.log({
        event: "JSON-format",
        value: INFO_STRING,
      });

      return res.status(404).send({
        error: "User does not exist"
      });
    }

    INFO_STRING = `User info requested by user id : , ${userIdInt} and user details found - ${JSON.stringify(userDetails)}!`;
    span.log({
      event: "JSON-format",
      value: INFO_STRING,
    });


    let orderDetails = await getOrderDetails(id);

    INFO_STRING = `Order info requested by user id : , ${userIdInt} and order details found - ${JSON.stringify(orderDetails)}!`;
    span.log({
      event: "JSON-format",
      value: INFO_STRING,
    });

    let responseData = {
      "userDetails": userDetails,
      "orders": orderDetails
    };

    INFO_STRING = `Order Information with user info requested by user id : , ${userIdInt} and order details with user info - ${JSON.stringify(responseData)}!`;
    span.log({
      event: "JSON-format",
      value: INFO_STRING,
    });
    span.finish();

    return res.status(200).send(responseData);

  } catch (error) {
    console.log(error);
    let INFO_STRING = `Order Information requested by user id  : , ${userIdInt} , error - ${JSON.stringify(error)}!`;
    span.log({
      event: "JSON-format",
      value: INFO_STRING,
    });
    span.finish();
    return res.status(500).send(error);
  }

});


const getUserDetails = (id) => {
  // Return new promise
  return new Promise(function (resolve, reject) {
    // Do async job
    let userUrl = `http://${SERVICE_URLS.USER_SERVICE_URL}/users/${id}`;
    let options = {
      url: userUrl,
      method: 'GET',
      headers: headers
    };
    request(options, function (err, resp, body) {
      if (err) {
        reject(err);
      } else {
        if (resp.statusCode == 200)
          resolve(JSON.parse(body));
        else
          resolve(null);
      }
    })
  })
}

const getOrderDetails = (id) => {
  // Return new promise
  return new Promise(function (resolve, reject) {
    // Do async job
    let orderUrl = `http://${SERVICE_URLS.ORDER_SERVICE_URL}/orders/${id}`;
    let options = {
      url: orderUrl,
      method: 'GET',
      headers: headers
    };

    request(options, function (err, resp, body) {
      if (err) {
        reject(err);
      } else {
        if (resp.statusCode == 200)
          resolve(JSON.parse(body).orders);
        else
          resolve(null);
      }
    })
  })
}


module.exports = router;