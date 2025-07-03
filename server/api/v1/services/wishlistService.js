const wishlistRepo = require("../repositories/wishlistRepository");
const userRepo = require("../repositories/userRepository");
const ErrorHandler = require("../../../utils/errorHandler");

const createWishlist = async (listingId, id) => {
  if (!listingId) throw new ErrorHandler("listing Not Found", 404);
  const Obj = {
    userId: id,
    listingId: listingId,
  };

  const wishlist = await wishlistRepo.createWishlist(Obj);
  if (!wishlist) throw new ErrorHandler("Failed to create wishlist", 400);
  await userRepo.updateUser(wishlist.userId, {
    $addToSet: { wishlists: wishlist._id },
  });
  return wishlist;
};

const deleteWishlist = async (id, userId) => {
  if (!id) throw new ErrorHandler("listing Not Found", 404);
  await userRepo.updateUser(userId, {
    $pull: { wishlists: id },
  });
  return await wishlistRepo.deleteWishlist(id);
};

module.exports = {
  createWishlist,
  deleteWishlist,
};
