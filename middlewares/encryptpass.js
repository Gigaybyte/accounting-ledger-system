const bcrypt = require("bcrypt");

const saltRounds = 10;

const encryptpass = async (myPlaintextPassword) => {

    return await bcrypt.hash(myPlaintextPassword, saltRounds);
    
};

module.exports = encryptpass;