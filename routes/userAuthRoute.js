import express from 'express';
import User from '../model/user.js'
import { handleFormError, createToken } from '../middleware/inbtw.js';

const router = express.Router();

router.get('/', (req,res) => res.redirect('/userAuth/login'));

router.get('/login', async (req,res) =>{
    res.render('user/login')
});

router.get('/signup', async (req,res)=>{
    res.render('user/signup');
});

router.post('/signup', async (req,res)=>{
    const {email, regno, name, password} = req.body;
    try{
        await User.create({email, regno, name, password});
        console.log('user created!'); 
        res.status(200).json({M: 'done'}); 
    }
    catch(err){
        console.log(err);
       let E = handleFormError(err);
       res.status(500).json({E});
    }
});

router.post('/login', async (req,res) =>{
    var {user, password} = req.body;
    var maxAge = 1 * 24 * 60 * 60;

    try{

        await User.login({user, password});
        let token = createToken(user);
        res.cookie('bookUser', token, {maxAge: maxAge * 1000, httpOnly: true}); 
        res.json({M: 'correct details'});
    }
    catch(err){
        let E = handleFormError(err);
        res.status(500).json({E});
        console.log(err);
    }
})

export default router;