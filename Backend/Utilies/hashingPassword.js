const bcrypt = require("bcrypt")

const hashingPassword = async(password) =>{
    return await bcrypt.hash(password, 10)
}

const comparePassword = async(password, hashingPassword) =>{
    return await bcrypt.compare(password, hashingPassword)
}

module.exports = {hashingPassword, comparePassword}