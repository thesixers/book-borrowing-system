import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, unique: [true,'This email has already been registered'] },
  regno: { type: String, required: true, unique: [true,'This regno has already been registered'] },
  password: { type: String, required: true },
  fineowed: {type: Number, default: 0},
  created_at: { type: Date, default: Date.now }
});



userSchema.pre('save', async function(){

  let salt = await bcrypt.genSalt(10);
  
  this.password = await bcrypt.hash(this.password, salt);

});



userSchema.statics.login = async function({user, password}){
    let lower = user.toLowerCase();
    let userbyEmail = await User.findOne({email: lower});
    let userbyRegno = await User.findOne({regno: lower});

    if(user === '') throw Error('email or regno field cant be empty')

    if(!userbyEmail){
      if(!userbyRegno) throw Error('user not found');
    };

    let UserPassword = (!userbyEmail) ? userbyRegno.password : userbyEmail.password;

    if(password === '') throw Error('Password field is empty');

    let isPasswordCorrect = bcrypt.compare(password, UserPassword);

    if(!isPasswordCorrect) throw Error('incorrect password'); 

    return 'correct details';
}

const User = mongoose.model('Bookuser', userSchema);
export default User;

