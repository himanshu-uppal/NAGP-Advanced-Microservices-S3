const {
    Router
} = require('express');
const request = require('request');

const router = Router();

router.get('/orderdetails/:id', async (req, res) => {

    try {
        let {
            id
        } = req.params;

        let userDetails = await getUserDetails(id);
          

        let orderDetails = await getOrderDetails(id);

        let responseData ={
            "userDetails": JSON.parse(userDetails),
            "orders": JSON.parse(orderDetails).orders
          };            

        res.status(200).send(responseData);

    } catch (error) {
        console.log(error);
    }

});


const getUserDetails = (id) => {
     // Return new promise
  return new Promise(function(resolve, reject) {
    // Do async job
    let userUrl = `http://${process.env.USER_SERVICE_URL}/users/${id}`;
    request.get(userUrl, function(err, resp, body) {
      if (err) {
        reject(err);
      } else {
        resolve(body);
      }
    })
  })
}

const getOrderDetails = (id) => {
    // Return new promise
 return new Promise(function(resolve, reject) {
   // Do async job
   let orderUrl = `http://${process.env.ORDER_SERVICE_URL}/orders/${id}`;
   request.get(orderUrl, function(err, resp, body) {
     if (err) {
       reject(err);
     } else {
       resolve(body);
     }
   })
 })
}


module.exports = router;