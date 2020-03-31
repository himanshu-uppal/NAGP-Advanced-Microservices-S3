const {
    Router
} = require('express');
const request = require('request');

const router = Router()

router.get('/orderdetails/:id', async (req, res) => {

    try {
        let {
            id
        } = req.params;

        let userDetails = await getUserDetails(id);
          

        let orderDetails = await getOrderDetails(id);

        let responseData ={
            "userDetails": JSON.parse(userDetails),
            "orders": JSON.parse(orderDetails)
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
    request.get(`http://localhost:9003/users/${id}`, function(err, resp, body) {
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
   request.get(`http://localhost:9002/orders/${id}`, function(err, resp, body) {
     if (err) {
       reject(err);
     } else {
       resolve(body);
     }
   })
 })
}


module.exports = router;