const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllListings = async (req, res) => {
    try {
        const listings = await prisma.listing.findMany();
        res.status(200).json(listings);
    } catch (error) {
        res.json({ error: error.message });
    }
};

const topRatingListings10 = async (req, res) => {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                rating: "asc",
            },
            take: 10,
        });
        res.status(200).json(listings);
    } catch (error) {
        res.json({ error: error.message });
    }
}

const mostAffordableListings10 = async (req, res) => {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                price: "asc",
            },
            where: {
                rating: {
                    gt: 4
                }
            },
            take: 10,
        });
        res.status(200).json(listings);
    } catch (error) {
        res.json({ error: error.message });
    }
}

const topSalesListings10 = async (req, res) => {
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                soldCount: "asc"
            }, 
            take: 10,
        })
    } catch (error) {
        res.json({ error: error.message });
    }
}

// wait till i figure it out xD
// const mostTrendyListings10 = async (req, res) => {
//     try {
//         const listings = await prisma.listing.findMany({
//             orderBy: {
//                 rating: "desc",
//             },
//             where: {
//                 rating: {
//                     gt: 4
//                 }
//             },
//             take: 10,
//         });
//         res.status(200).json(listings);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

module.exports = {};