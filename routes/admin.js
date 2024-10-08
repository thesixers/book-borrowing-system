import express from 'express';
import Admin from '../model/admin.js';
import { createToken, handleFormError, checkAdmin } from '../middleware/inbtw.js';
import Book from '../model/book.js';
import BorrowReq from '../model/borrowReq.js';
import User from '../model/user.js';
import BorrowingRec from '../model/borrowing.js';

const router = express.Router();

router.get('*', checkAdmin)

router.get('/', (req,res)=> res.redirect('admin/dashboard'));

router.get('/dashboard', (req,res) => res.render('admin/admindash'));

router.get('/borrow-requests', (req,res) => res.render('admin/borrowrequest'));

router.get('/borrowed-books', (req,res) => res.render('admin/borrowedBooks'));

router.get('/manage-books', (req,res) => res.render('admin/managebooks'));

router.get('/manage-users', (req,res) => res.render('admin/manageusers'));

/*POST REQUESTS*/  
router.post('/add-book', async (req,res) =>{
    let {title, author, genre, total_copies, isbn, published_year} = req.body;
    let copies_available = total_copies

    try{
        await Book.create({title, author, genre, total_copies, copies_available, isbn, published_year});
        res.status(200).json({M: 'book Added'});
    }
    catch(err){
        console.log(err);
    }
});

router.put('/reject-req', async (req,res) =>{
    let id = req.body;
    try {

        let request = await BorrowReq.findById(id); 
        if(!request) res.status(404).json({E: 'request not found'})
        request.status = 'rejected';
        await request.save();
        res.status(200).json({M: 'request rejected'})
        
    } catch (err) {
        console.log(err);
    }
});

router.put('/approve-req', async (req,res) =>{
    let {ID} = req.body;
    let id = ID;
    try {

        let request = await BorrowReq.findById(id); 
        if(!request) res.status(404).json({E: 'request not found'})
        request.status = 'approved';
        await request.save();

        let { userRegno,bookIsbn, _id} = request;

        await BorrowingRec.create({
            userRegno,
            bookIsbn,
            request_id: _id
        })

        res.status(200).json({M: 'request approved', C: request})
        
    } catch (err) {
        console.log(err);
    }
});

router.post('/search-users', async (req,res)=>{
    let value = req.body;
    
    try {
        let users = await User.find();
        let borrowlist = await BorrowingRec.find()
        // let search =  users.map(e => e.title.toLowerCase().includes(value));
        res.status(200).json({users, borrowlist});
    } catch (err) {
        console.log(err);
    }

});

router.post('/collected', async (req,res)=> {
    let {due_date, status,id,borrow_date} = req.body;

    try {
        let borrow = await BorrowingRec.findById(id);
        borrow.due_date = due_date;
        borrow.status = status; 
        borrow.borrow_date = borrow_date;
       await borrow.save();
       res.status(200).json({M: 'status updated!!'});
    } catch (err) {
        console.log(err);
    }

});

export default router;