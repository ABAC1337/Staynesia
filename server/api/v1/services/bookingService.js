const bookingRepo = require("../repositories/bookingRepository");
const listingRepo = require("../repositories/listingRepository");
const date = require("../../../utils/date");
const userRepo = require("../repositories/userRepository");
const ErrorHandler = require("../../../utils/errorHandler");

const createBooking = async (id, data) => {
  if (!data) 
    throw new ErrorHandler("Value not found", 404);
  const { checkIn, checkOut, listingId } = data;

  const listing = await listingRepo.findById(data.listingId)
  if (!listing) 
    throw new ErrorHandler("Listing not found", 404)
  
  const checkInDate = date.converter(checkIn);
  const checkOutDate = date.converter(checkOut);
  if (checkInDate >= checkOutDate) 
    throw new ErrorHandler("Invalid Date", 400);

  const available = isBookingAvailable(
    listing.bookedDate,
    checkInDate,
    checkOutDate
  );
  if (!available)
    throw new ErrorHandler("Cannot book due to booked by someone", 400);

  const durationMs = checkOutDate - checkInDate;
  const convertDuration = durationMs / (1000 * 60 * 60 * 24);
  const calculatePrice = listing.price * convertDuration;
  const taxAmount = calculatePrice * 0.12;
  const feeAmount = 5000;
  const totalPrice = calculatePrice + taxAmount + feeAmount;
  if (totalPrice < 0)
    throw new ErrorHandler("Invalid Value, value was minus", 400);

  const dataBooking = {
    checkIn: checkIn,
    checkOut: checkOut,
    duration: convertDuration,
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

const updateBooking = async (id, data) => {
  if (!id) 
    throw new ErrorHandler("Booking not found", 404);
  const { checkIn, checkOut, listingId } = data;

  const listing = await listingRepo.findById(listingId)
  if (!listing)
    throw new ErrorHandler("Listing not found", 404)

  const checkInDate = date.converter(checkIn);
  const checkOutDate = date.converter(checkOut);
  if (checkInDate >= checkOutDate)
    throw new ErrorHandler(`Invalid Date ${checkInDate} - ${checkOutDate} : ${checkInDate >= checkOutDate}`, 400);

  const durationMs = checkOutDate - checkInDate;
  const convertDuration = durationMs / (1000 * 60 * 60 * 24);
  const available = isBookingAvailable(
    listing.bookedDate,
    checkInDate,
    checkOutDate
  );
  if (!available)
    throw new ErrorHandler("Cannot book due to booked by someone", 400);

  const bookingData = {
    checkIn: checkInDate,
    checkOut: checkOutDate,
    duration: convertDuration
  }
  return await bookingRepo.updateBooking(id, bookingData);
};

const updateStatusBooking = async (id, statusQuery) => {
  if (!data.id) throw new ErrorHandler('Booking Not Found', 404)
  return await bookingRepo.updateBooking(id, { bookingStatus: statusQuery })
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

const isBookingAvailable = (bookedDates, newCheckIn, newCheckOut) => {
  const startDate = new Date(newCheckIn);
  const endDate = new Date(newCheckOut);
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString();
    if (bookedDates.includes(dateStr)) return false;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return true;
};

const getBookedDates = async (listingId) => {
  const filterObj = {
    listingId: listingId,
    bookingStatus: "confirmed",
  };

  const optionsObj = {
    select: "-_id checkIn checkOut",
  };

  const queryObj = {
    filterObj,
    optionsObj,
  };

  const bookings = await bookingRepo.findBooking(queryObj);
  const result = [];
  for (const bd of bookings) {
    let start = new Date(bd.checkIn)
    const end = new Date(bd.checkOut)
    if (isNaN(start) || isNaN(end)) continue

    while (start <= end) {
      result.push(start.toISOString().split("T")[0])
      start.setDate(start.getDate() + 1)
    }
  }
  return result;
};

const getBookingById = async (id) => {
  if (!id) throw new ErrorHandler("Booking Not Found", 404);
  const filterObj = { _id: id };
  const optionsObj = {
    populate: [
      {
        path: "listingId",
        select: "title category price capacity imgUrl rating numRating location.province",
      },
      {
        path: 'paymentId',
        select: 'midtrans_redirect'
      }
    ]
  };
  const queryObj = {
    filterObj,
    optionsObj,
  };
  return await bookingRepo.findBooking(queryObj);
};

module.exports = {
  createBooking,
  getBookedDates,
  isBookingAvailable,
  getBookingById,
  updateBooking,
  updateStatusBooking,
  deleteBooking,
};
