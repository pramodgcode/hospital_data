const express = require('express');// express framework
const app = new express();                                  // this is important
// const morgan = require('morgan');
// app.use(morgan('dev'));
require('dotenv').config(); // DOTENV file
const base_route = require('./routes/index'); //local module import


app.use('/api/hospitals', base_route);

app.listen(process.env.PORT, () => {
    console.log(`server is listening on PORT ${process.env.PORT}`)
})
