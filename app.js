import express from 'express';
import {connect} from 'mongoose';
import cookieParser from 'cookie-parser';
import env from 'dotenv';
import morgan from 'morgan';
import userAuthRoute from './routes/userAuthRoute.js';
import adminAuthRoute from './routes/adminAuthRoute.js';
import userRoute from './routes/user.js';
import adminRoute from './routes/admin.js';
env.config();

const app = express();

const { PORT, MONGO_URI } = process.env;


app.set('view engine', 'ejs');
app.use(express.static('public')); 
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
// app.use(fileuploader({ useTempFiles: true }));

const port = PORT || 2;


app.get('/', (req,res) =>{
    res.redirect('/user');
});

app.use('/userAuth', userAuthRoute);
app.use('/adminAuth', adminAuthRoute);
app.use('/user', userRoute);
app.use('/admin', adminRoute);



connect(MONGO_URI)
.then(result => {
    console.log('connected to the DB');
    app.listen(port, () =>{ console.log(`we are listening at port ${port}`) });
})
.catch(err =>{
    console.error(err);
});

