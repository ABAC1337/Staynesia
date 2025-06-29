const bookingRepo = require("../repositories/bookingRepository");
const listingRepo = require("../repositories/listingRepository");
const dateConverter = require("../../../utils/dateConverter");
const userRepo = require("../repositories/userRepository");
const ErrorHandler = require("../../../utils/errorHandler");

const createBooking = async (id, data) => {
  if (!data) throw new ErrorHandler("Value not found", 404);
  const { checkIn, checkOut, numGuest, listingId } = data;

  const checkInDate = dateConverter(checkIn);
  const checkOutDate = dateConverter(checkOut);
  
  if (checkInDate >= checkOutDate) throw new ErrorHandler("Invalid Date", 400);

  const bookedDates = await getBookedDates(data.listingId);
  const available = isBookingAvailable(
    bookedDates,
    data.checkIn,
    data.checkOut
  );
  if (!available)
    throw new ErrorHandler("Cannot book due to booked by someone", 400);
  
  const listing = await listingRepo.findOneListing({ _id: data.listingId });
  const durationMs = checkOutDate - checkInDate;
  const convertDuration = durationMs / (1000 * 60 * 60 * 24);
  const totalPrice = listing.price * convertDuration;
  if (totalPrice < 0)
    throw new ErrorHandler("Invalid Value, value was minus", 400);
  
  const dataBooking = {
    checkIn: checkInDate,
    checkOut: checkOutDate,
    numGuest: parseInt(numGuest),
    totalPrice: totalPrice,
    userId: id,
    listingId: listingId,
  };
  console.log(dataBooking);
  const booking = await bookingRepo.createBooking(dataBooking);

  await Promise.all([
    listingRepo.updateListing(booking.listingId, {
      $addToSet: { bookings: booking._id },
    }),
    userRepo.updateUser(booking.userId, {
      $addToSet: { bookings: booking._id },
    }),
  ]);
  return booking;
};

const updateBooking = async (data) => {
  if (!data.id) throw new ErrorHandler("Booking Not Found", 404);
  if (new Date(data.checkIn) >= new Date(data.checkOut))
    throw new ErrorHandler("Invalid Date", 400);
  return await bookingRepo.updateBooking(data);
};

const deleteBooking = async (id) => {
  return await bookingRepo.deleteBooking(id);
};

function isBookingAvailable(bookedDates, newCheckIn, newCheckOut) {
  const startDate = dateConverter(newCheckIn);
  const endDate = dateConverter(newCheckOut);
  let currentDate = startDate;
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split("T")[0];
    if (bookedDates.includes(dateStr)) return false;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return true;
}

const getBookedDates = async (listingId) => {
  const booking = await bookingRepo.findBooking({ listingId: listingId });

  const result = [];
  for (const bd of booking) {
    let start = dateConverter(bd.checkIn);
    const end = dateConverter(bd.checkOut);
    if (isNaN(start) || isNaN(end)) continue;
    while (start <= end) {
      result.push(start.toISOString().split("T")[0]);
      start.setDate(start.getDate() + 1);
    }
  }
  return result;
};

module.exports = {
  createBooking,
  getBookedDates,
  updateBooking,
  deleteBooking,
};
