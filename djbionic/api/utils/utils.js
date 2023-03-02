const RandExp = require('randexp');


const makeid = (length) => {
  let result = '';
  //let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let characters = '0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result.toUpperCase();
}

var generator = require('generate-password');

const generatePassword = (length) => {
  // var password = generator.generate({
  //   length: length,
  //   numbers: true,
  //   symbols: true,
    
  // });

  var password =  new RandExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,8}$/).gen()

  password = password + `@HfU0`

  return password;
}


module.exports = {
  makeid,
  generatePassword
}
