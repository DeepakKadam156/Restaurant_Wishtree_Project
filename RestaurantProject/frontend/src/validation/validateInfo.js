export default function validateInfo(values){
    let errors={}
    let valid=true;

    //name validation
    var nameFormat = /^[a-zA-Z0-9_]*$/;
    if(!values.name.trim()){
        errors.name="Name must be Required."
        valid=false;
    }
    else if(!nameFormat.test(values.name)){
        errors.name="Name should not contain special characters."
        valid=false;
    }

    //address validation
    if(!values.address.trim()){
        errors.address="Address must be required."
        valid=false;
    }

    //openTime validation
    if(!values.openTime.trim()){
        errors.openTime="OpenTime must be required."
        valid=false;
    }

    //closeTime validation

    if(!values.closeTime.trim()){
        errors.closeTime="CloseTime must be required."
        valid=false;
    }

    //phone validation
    var phoneFormat=/^[7-9][0-9]{9}$/;
    if(!phoneFormat.test(values.phone)){
        errors.phone="Enter Number is invalid.";
        valid=false;
    }

    //imageValidation
    
    var fileExtension=/([a-zA-Z0-9\s_\\.\-:])+(.png|.jpg)$/;
     if(!fileExtension.exec(values.imageUrl)){
        errors.imageUrl="Image file format must be png and jpg";
        valid=false;
    }

    return [valid,errors];
}