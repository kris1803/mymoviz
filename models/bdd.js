let mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const MONGODB_LINK = process.env.MONGODB_LINK || ' ';

mongoose.connect(MONGODB_LINK,
    options,
    function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connected to MongoDB');
        }
    }
);


module.exports = mongoose;