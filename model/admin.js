import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: [true,'This email has already been registered'] },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
});


adminSchema.pre('save', async function(){

  let salt = await bcrypt.genSalt(10);
  
  this.password = await bcrypt.hash(this.password, salt);

});



adminSchema.statics.login = async function({email, password}){
    let user = await Admin.findOne({email});

    if(email === '') throw Error('email or regno field cant be empty')

    if(!user) throw Error('user not found')

    if(password === '') throw Error('Password field is empty');

    let isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect) throw Error('incorrect password');

    return user;
}

const Admin = mongoose.model('bookadmin', adminSchema);
export default Admin;
