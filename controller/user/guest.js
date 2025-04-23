const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const createGuest = async (name, email, hashPass) => {
    return await prisma.Guest.create({
        name : name,
        email : email,
        password : hashPass
    })
}
const findGuestEmail = async (payload) => {
    const guest = await prisma.Guest.findOne({
        email : payload
    })
}

module.exports = {
    findGuestEmail,
    createGuest
}