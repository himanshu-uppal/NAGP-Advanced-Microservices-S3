const express = require('express')
const cors = require('cors')

const app = express();
const {
    db,
    User
} = require('./models/index');
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.use('/', require('./routes'));

const PORT = 9000;

console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);

db.sync().then(() => {
    console.log('Database Synced');

    app.listen(PORT, () => {
        console.log(`Server started at http://localhost:${PORT}`);

        User.bulkCreate([{
            name: "John",
            email: "john.doe@google.com",
            age: 23
        }]).then((users) => {
            console.log("Users created");
        });

    });
}).catch(console.error)