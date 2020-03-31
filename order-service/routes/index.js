const {
    Router
} = require('express')

const router = Router()

router.get('/orders/:orderId', async (req, res) => {

    try {
        let {
            orderId
        } = req.params;

        let responseData ={
            "orders": [
              {
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

        res.status(200).send(responseData);

    } catch (error) {
        console.log(error);
    }

});

module.exports = router;