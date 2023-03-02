const { GeneralError } = require("../utils/error");

const shouldlogin = (req,res,next) => {
  console.log(req.decoded)
    let { is_login } = req.decoded;
    if(is_login === 1){
        next();
    }else{
      next(new GeneralError("seems to be you are not a login user"));  
    }
}

const shouldAdmin = (req,res,next) => {
    let { role } = req.decoded;
    if(role === 1){
        next();
    }else{
      next(new GeneralError("seems to be you are not a admin user"));  
    }
}

module.exports = {
     shouldlogin,
     shouldAdmin
}