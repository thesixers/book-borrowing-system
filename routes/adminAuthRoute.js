import express from 'express';
import Admin from '../model/admin.js';
import { createToken, handleFormError } from '../middleware/inbtw.js';

const router = express.Router();

router.get('/login', async (req,res) => res.render('admin/login'));

router.post('/login', async (req,res) => {
    const {email, password} = req.body;
    let maxAge = 1 * 24 * 60 *60;
    console.log({email, password}); 

    try{
        await Admin.login({email, password});
        const token = createToken(email);
        res.cookie('bookAdmin', token, {httpOnly: true, maxAge: maxAge * 1000})
        res.status(200).json({M: 'logged'});
    }
    catch(err){
        const E = handleFormError(err);
        res.status(500).json({E});
        console.log(E);
    }
});

router.post('/signup', async (req,res)=>{
    const {email, name} = req.body;
    console.log(email,name);
    const password = 'funai1234';

    try{
        await Admin.create({email, name, password});
        res.status(200).json({M: 'admin created!!'});
    }
    catch(err){
        console.log(err);
    }
});

// router.get('/logout', async (req,res) => {
//     res.clearCookie('bookAdmin',{maxAge: 1});
//     res.cookie('bookAdmin', '', {httpOnly: true, maxAge: 1})
// })



export default router;