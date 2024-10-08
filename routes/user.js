import express from 'express';
import { checkToken } from '../middleware/inbtw.js';
import BorrowReq from '../model/borrowReq.js';
import BorrowingRec from '../model/borrowing.js';

const router = express.Router();

router.get('*', checkToken)

router.get('/', (req,res)=> res.redirect('/user/user-dashboard'));

router.get('/user-dashboard', async (req,res)=>{
    res.render('user/userdash.ejs', {title: 'User Dashboard'});
});

router.get('/browse-books', (req,res) =>{
    res.render('user/browseBooks.ejs')
});

router.get('/borrow-requests', (req,res) => {
    res.render('user/borrowRequests.ejs')
})

router.get('/borrow-record', (req,res) => {
    res.render('user/borrowRecord.ejs');
});

router.post('/request', async (req,res) =>{
    let {userRegno,request_date,bookIsbn} = req.body;

    try {
        let check = await BorrowReq.findOne({userRegno});
        console.log(typeof check); 
        if(check){
            if(check.status === 'pending'){
                // console.log('pending');
                res.status(200).json({E: 'u have a pending request for this book'})
                // console.log(true);
            }else{
                let reqcreate = await BorrowReq.create({userRegno,request_date,bookIsbn});
                if(reqcreate) res.status(200).json({M: 'done'});
            }  
        }else{
            let reqcreate = await BorrowReq.create({userRegno,request_date,bookIsbn});
            if(reqcreate) res.status(200).json({M: 'done'});
        }
    } catch (err) {
        console.log(err);
    }
});

 
export default router;
