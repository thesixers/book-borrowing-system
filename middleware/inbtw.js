import jwt from 'jsonwebtoken';
import env from 'dotenv';
import User from '../model/user.js';
import Book from '../model/book.js';
import BorrowingRec from '../model/borrowing.js';
import BorrowReq from '../model/borrowReq.js';
env.config();

let {JWT_SECRET} = process.env;

export const handleFormError = (err)=>{
    const error = {email: '', user: '', password: '', regno: ''}
    if(err.message === 'email or regno field cant be empty'){
        error.user =  'email or regno field cant be empty';
    }

    if(err.message === 'user not found'){
        error.user =  'user not found';
    }

    if(err.message === 'Password field is empty'){
       error.password =  'Password field is empty';
    }

    if(err.message === 'incorrect password'){
        error.password = 'incorrect password';
    }


    if(err.code === 11000){
        if(err.message.includes('email_1 dup key')){
            error.email = 'This email already exists';
        }

        if(err.message.includes('regno_1 dup key')){
            error.regno = 'This regno already exists';
        }
    }


    return error;
}

export const createToken = (user) =>{
    const maxAge = 1*24*60*60;
    return jwt.sign({user}, JWT_SECRET, {expiresIn: maxAge})
}

export const checkToken =  (req,res,next) =>{
    let token = req.cookies.bookUser;
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if(!token) res.redirect('/userAuth/login');

    if(token){
        jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
            if(err) res.redirect('/userAuth/login');
    
            if(decodedToken){
                let em = decodedToken.user;
                let books = await Book.find();
                let borrowlist;
                let borrowReq;
                let user;

                if(emailRegex.test(decodedToken.user)){
                    user = await User.findOne({email: em});
                    let regno = user.regno;
                    borrowlist = await BorrowingRec.find({userRegno: regno});
                    borrowReq = await BorrowReq.find({userRegno: regno})
                }else{
                    user = await User.findOne({regno: em});
                    borrowlist = await BorrowingRec.find({userRegno: em});
                    borrowReq = await BorrowReq.find({userRegno: em});
                }


                res.locals.all = {user,borrowReq, borrowlist, books};
                next();
            };
        });
    } 
}

export const checkAdmin =  (req,res,next) =>{
    let token = req.cookies.bookAdmin;
    if(!token) res.redirect('/adminAuth/login');

    if(token){
        jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
            if(err) res.redirect('/adminAuth/login');
    
            if(decodedToken){
                let users = await User.find();
                let books = await Book.find();
                let borrowlist = await BorrowingRec.find();
                let borrowReq = await BorrowReq.find();

                res.locals.all = {users, books, borrowReq, borrowlist};
                next()
            };
        });
    }
}