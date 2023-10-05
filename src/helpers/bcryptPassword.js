import bcrypt from 'bcrypt'

async function encryptPassword(pass){
    const SALT_RANGE = parseInt(process.env.SALT_RANGE)
    const encPassword = await bcrypt.hash(pass, SALT_RANGE);
    return encPassword
}

async function decrypPassword(plainPassword, encPass){
    const result = await bcrypt.compare(plainPassword, encPass);
    return result
}

export {
    encryptPassword,
    decrypPassword
}