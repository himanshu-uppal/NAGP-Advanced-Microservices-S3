const {
  Router
} = require('express');
const request = require('request');

const router = Router();

const SERVICE_URLS = require('../constants');

router.get('/orderdetails/:id', async (req, res) => {

  try {
    let {
      id
    } = req.params;

    let userDetails = await getUserDetails(id);

    if (!userDetails) {

     return res.status(404).send({
        error: "User does not exist"
      });
    }

    let orderDetails = await getOrderDetails(id);

    let responseData = {
      "userDetails": userDetails,
      "orders": orderDetails
    };

   return res.status(200).send(responseData);

  } catch (error) {
    console.log(error);
  return  res.status(500).send(error);
  }

});


const getUserDetails = (id) => {
  // Return new promise
  return new Promise(function (resolve, reject) {
    // Do async job
    let userUrl = `http://${SERVICE_URLS.USER_SERVICE_URL}/users/${id}`;
    request(userUrl, function (err, resp, body) {
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
    request(orderUrl, function (err, resp, body) {
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