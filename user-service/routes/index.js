const {
    Router
} = require('express')

const router = Router();
const {
    User
} = require('../models/index');

router.get('/users/:userId', async (req, res) => {

    try {
        let {
            userId
        } = req.params;

        let userIdInt = parseInt(userId);

        let user = await User.findByPk(userIdInt);

        if (!user) {
            return res.sendStatus(404);
        }

        let responseData = {
            name: user.name,
            age: user.age,
            email: user.email
        };

        return res.status(200).send(responseData);

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }

});

module.exports = router;