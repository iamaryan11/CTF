const validator=require('validator');
const validate=(data)=>{
    const mandatoryfield=['user_name','email_id','password','phone'];
    const IsAllowed=mandatoryfield.every((userValidation)=>Object.keys(data).includes(userValidation));
    if(!IsAllowed){
        throw new Error('Some fields are missing');
    }
    if(!validator.isEmail(data.email_id)){
        throw new Error('Invalid Email format');
    }
    if(!validator.isMobilePhone(data.phone)){
        throw new Error('Invalid phone number');
    }
}
module.exports=validate;