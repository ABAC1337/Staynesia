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

  const listing = await listingRepo.findById(data.listingId);
  const durationMs = checkOutDate - checkInDate;
  const convertDuration = durationMs / (1000 * 60 * 60 * 24);
  const calculatePrice = listing.price * convertDuration;
  const taxAmount = calculatePrice * 0.12;
  const feeAmount = 5000;
  const totalPrice = calculatePrice + taxAmount + feeAmount;
  if (totalPrice < 0)
    throw new ErrorHandler("Invalid Value, value was minus", 400);

  const dataBooking = {
    checkIn: checkInDate,
    checkOut: checkOutDate,
    duration: convertDuration,
    numGuest: parseInt(numGuest),
    calculatePrice: calculatePrice,
    taxAmount: taxAmount,
    feeAmount: feeAmount,
    totalPrice: totalPrice,
    userId: id,
    listingId: listingId,
  };

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
  const { checkIn, checkOut, numGuest } = data;
  if (dateConverter(checkIn) >= dateConverter(checkOut))
    throw new ErrorHandler("Invalid Date", 400);
  const listing = await listingRepo.findById(data.listingId);
  if (numGuest > listing.capacity)
    throw new ErrorHandler(`Number of guest must be ${listing.capacity} or below`, 400);
  const bookingData = {
    checkIn,
    checkOut,
    numGuest
  }
  return await bookingRepo.updateBooking(data.id, bookingData);
};

const updateStatusBooking = async (id, statusQuery) => {
  if (!data.id) throw new ErrorHandler('Booking Not Found', 404)
  return await bookingRepo.updateBooking(id, {bookingStatus: statusQuery})
}

const deleteBooking = async (id) => {
  const booking = await bookingRepo.findBookingById(id);
  await Promise.all([
    listingRepo.updateListing(booking.listingId, {
      $pull: { bookings: booking._id },
    }),
    userRepo.updateUser(booking.userId, {
      $pull: { bookings: booking._id },
    }),
  ]);
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
  const filterObj = {
    listingId: listingId,
    bookingStatus: "confirmed",
  };
  const optionsObj = {
    select: "checkIn checkOut",
  };
  const queryObj = {
    filterObj,
    optionsObj,
  };
  const booking = await bookingRepo.findBooking(queryObj);
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

const getBookingById = async (id) => {
  if (!id) throw new ErrorHandler("Booking Not Found", 404);
  const filterObj = { _id: id };
  const optionsObj = {
    populate: {
      path: "listingId",
      select: "title imgUrl rating numRating location.province",
    },
  };
  const queryObj = {
    filterObj,
    optionsObj,
  };
  const result = await bookingRepo.findBooking(queryObj);
  return result;
};

module.exports = {
  createBooking,
  getBookedDates,
  getBookingById,
  updateBooking,
  updateStatusBooking,
  deleteBooking,
};
