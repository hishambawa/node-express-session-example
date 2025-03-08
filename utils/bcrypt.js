const bcrypt = require('bcrypt')

const generateHash = async (string) =>{
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedpassword = await bcrypt.hash(string, salt)
    return hashedpassword
}

const verifypassword = async (password, hashedPasswordFromDB) =>{
    try{
        const isMatch = await bcrypt.compare(password, hashedPasswordFromDB)
        return isMatch
    }catch(error){
        console.error(error)
        return false
    }
}

module.exports = {generateHash, verifypassword}