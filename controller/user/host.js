const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createHost = async (name, email, hashPass) => {
    return await prisma.Guest.create({
        name : name,
        email : email,
        password : hashPass
    })
}
const findHostEmail = async (payload) => {
    const guest = await prisma.Guest.findOne({
        email : payload
    })
}

module.exports = {
    findHostEmail,
    createHost
}