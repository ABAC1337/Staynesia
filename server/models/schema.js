const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema
const UserSchema = new Schema({
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
    role: {
        type: String,
        enum: {
            values: ["Guest", "Host"],
            message: "User role doesn't exist"
        }
    },
    listings: [{ type: Schema.Types.ObjectId, ref: 'Listing' }],
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    wishlists: [{ type: Schema.Types.ObjectId, ref: 'Wishlist' }],
    payments: [{ type: Schema.Types.ObjectId, ref: 'Payment' }]
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
    hostId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, "Host is required"] 
    },
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
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
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
        min: [0, 'Amount must be greater than or equal 0'],
        required: [true, "Amount is required field!"]
    },
    paidAt: {
        type: Number
    },
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

// Review Schema
const ReviewSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
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
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    listingId: { type: Schema.Types.ObjectId, ref: 'Listing' }
}, { timestamps: true });

// Export models
module.exports = {
    User: mongoose.model('User', UserSchema),
    Listing: mongoose.model('Listing', ListingSchema),
    Booking: mongoose.model('Booking', BookingSchema),
    Payment: mongoose.model('Payment', PaymentSchema),
    Review: mongoose.model('Review', ReviewSchema),
    Wishlist: mongoose.model('Wishlist', WishlistSchema)
};
