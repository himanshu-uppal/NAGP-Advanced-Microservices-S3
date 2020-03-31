const {
    Router
} = require('express')

const router = Router()

router.get('/users/:userId', async (req, res) => {

    try {
        let {
            userId
        } = req.params;

        let responseData = {
            "name": "John",
            "age": "23",
            "email": "john.doe@google.com"
        };

        res.status(200).send(responseData);

    } catch (error) {
        console.log(error);
    }

});

module.exports = router;