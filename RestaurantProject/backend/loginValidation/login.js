const validator=require('validator');
const isEmpty=require('is-empty');

module.exports = function validateLogin(data) {
    let err= {};

    data.email= !isEmpty(data.email) ? data.email:"";
    data.password= !isEmpty(data.password) ? data.password :"";

    //emailChecks
    if(validator.isEmpty(data.email)){
        err.email="Email Field is required."
    }else if (!validator.isEmail(data.email)){
        err.email ="Email is Invalid";
    }

    //password checks

    if(validator.isEmpty(data.password)){
        err.password="Password Field is required."
    }
    
    return {
        err,
        isValid:isEmpty(err),
    }

}