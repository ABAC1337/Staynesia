const mongoose = require('mongoose');
const { Schema } = mongoose;

// Guest Schema
const GuestSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required field"]
    },
    username: {
        type: String,
        required: [true, "Username is required field"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required field"],
        unique: true,
    },
    hashPassword: {
        type: String,
        required: [true, "Password is required field"]
    },
    imageUrl: {
        type: String
    },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    wishlists: [{ type: Schema.Types.ObjectId, ref: 'Wishlist' }],
    payments: [{ type: Schema.Types.ObjectId, ref: 'Payment' }]
}, { timestamps: true });

// Host Schema
const HostSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required field"]
    },
    username: {
        type: String,
        required: [true, "Username is required field"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required field"],
        unique: true,
    },
    hashPassword: {
        type: String,
        required: [true, "Password is required field"]
    },
    imageUrl: {
        type: String
    },
    listings: [{ type: Schema.Types.ObjectId, ref: 'Listing' }]
}, { timestamps: true });

// Listing Schema
const ListingSchema = new Schema({
    location: {
        province: {
            type: String,
            required: [true, "Province is required field!"]
        },
        city: {
            type: String,
            required: [true, "City is required field!"]
        },
        address: {
            type: String,
            required: [true, "Address is required field!"]
        }
    },
    category: {
        type: String,
        required: [true, "Category is required field!"]
    },
    title: {
        type: String,
        required: [true, "Title is required field!"]
    },
    description: {
        type: String,
        required: [true, "Description is required field!"]
    },
    rules: {
        checkIn: {
            type: String,
            required: [true, "Rules checkIn is required field!"]
        },
        checkOut: {
            type: String,
            required: [true, "Rules checkOut is required field!"]
        },
        nightTime: {
            type: [String],
            required: [true, "Rules quite hour is required field!"]
        },
        additional: {
            type: String,
            required: [true, "Additional rules is required field!"]
        }
    },
    imgUrl: {
        type: [String],
        required: [true, "Images is required field!"]
    },
    facility: {
        type: [String],
        required: [true, "Facility is required field!"]
    },
    capacity: {
        type: Number,
        required: [true, "Capacity is required field!"]
    },
    price: {
        type: Number,
        required: [true, "Price is required field!"]
    },
    host: { type: Schema.Types.ObjectId, ref: 'Host' },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    wishlists: [{ type: Schema.Types.ObjectId, ref: 'Wishlist' }]
}, { timestamps: true });

// Booking Schema
const BookingSchema = new Schema({
    checkIn: {
        type: Date,
        required: [true, "Check in is required field!"]
    },
    checkOut: {
        type: Date,
        required: [true, "Check out is required field!"]
    },
    numGuest: {
        type: Number,
        required: [true, "Number of guest is required field!"]
    },
    totalPrice: {
        type: Number,
        required: [true, "Total price is required field!"]
    },
    statusBooking: {
        type: String,
        default: "Pending",
        enum: {
            values: ["Pending", "Confirmed", "Succeeded"],
            message: "This status does not exist"
        }
    },
    guestId: { type: Schema.Types.ObjectId, ref: 'Guest' },
    listingId: { type: Schema.Types.ObjectId, ref: 'Listing' },
    payment: { type: Schema.Types.ObjectId, ref: 'Payment' }
}, { timestamps: true });

// Payment Schema
const PaymentSchema = new Schema({
    paymentMethod: {
        type: Number,
        required: [true, "Payment method is required field!"]
    },
    paymentStatus: {
        type: String,
        default: "Pending",
        enum: {
            values: ["Pending", "Success", "Canceled"],
            message: "This status does not exist"
        }
    },
    amount: {
        type: Number,
        required: [true, "Amount is required field!"]
    },
    paidAt: {
        type: Number
    },
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking' },
    guestId: { type: Schema.Types.ObjectId, ref: 'Guest' }
}, { timestamps: true });

// Review Schema
const ReviewSchema = new Schema({
    guestId: { type: Schema.Types.ObjectId, ref: 'Guest' },
    listingId: { type: Schema.Types.ObjectId, ref: 'Listing' },
    rating: {
        type: Number,
        min: [1, "Rating must be 1.0 or above"],
        max: [5, "Rating must be 5.0 or below"]
    },
    reviewText: String
}, { timestamps: true });

// Wishlist Schema
const WishlistSchema = new Schema({
    guestId: { type: Schema.Types.ObjectId, ref: 'Guest' },
    listingId: { type: Schema.Types.ObjectId, ref: 'Listing' }
}, { timestamps: true });

// Export models
module.exports = {
    Guest: mongoose.model('Guest', GuestSchema),
    Host: mongoose.model('Host', HostSchema),
    Listing: mongoose.model('Listing', ListingSchema),
    Booking: mongoose.model('Booking', BookingSchema),
    Payment: mongoose.model('Payment', PaymentSchema),
    Review: mongoose.model('Review', ReviewSchema),
    Wishlist: mongoose.model('Wishlist', WishlistSchema)
};
