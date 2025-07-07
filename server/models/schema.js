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
        lowercase: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required field"],
        unique: true,
    },
    phone: {
        type: String,
        required: [true, "Phone number is required field!"]
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
            values: ["guest", "host"],
            message: "User role doesn't exist"
        },
        lowercase: true
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
            lowercase: true,
            required: [true, "Province is required field!"]
        },
        city: {
            type: String,
            lowercase: true,
            required: [true, "City is required field!"]
        },
        address: {
            type: String,
            lowercase: true,
            required: [true, "Address is required field!"]
        }
    },
    category: {
        type: String,
        lowercase: true,
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
        lowercase: true,
        required: [true, "Facility is required field!"]
    },
    capacity: {
        type: Number,
        required: [true, "Capacity is required field!"]
    },
    price: {
        type: Number,
        min: [0, "Price must be above 0"],
        required: [true, "Price is required field!"]
    },
    hostId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Host is required"]
    },
    rating: {
        type: Number,
        min: [1, "Rating must be 1.0 or above"],
        max: [5, "Rating must be 5.0 or below"]
    },
    numRating: {
        type: Number,
        min: [0, "Number of review must be above 0"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}, { timestamps: true });

// Booking Schema
const BookingSchema = new Schema({
    checkIn: {
        type: Date,
        min: [Date.now(), "Date invalid"],
        required: [true, "Check in is required field!"]
    },
    checkOut: {
        type: Date,
        required: [true, "Check out is required field!"]
    },
    duration: {
        type: Number,
        min: [1, "Duration of booking must be above 1"],
        required: [true, "Duration is required field!"]
    },
    numGuest: {
        type: Number,
        min: [1, "Number of guest must be above 1"],
        required: [true, "Number of guest is required field!"]
    },
    calculatePrice: {
        type: Number,
        min: [0, 'Price must be greater than or equal 0'],
        required: [true, "Amount is required field!"]
    },
    taxAmount:{
        type: Number,
        min: [0, 'Tax must be greater than or equal 0'],
        required: [true, "Amount is required field!"]
    },
    feeAmount: {
        type: Number,
        min: [0, 'Fee must be greater than or equal 0'],
        required: [true, "Amount is required field!"]
    },
    totalPrice: {
        type: Number,
        min: [0, "totalPrice must be above 0"],
        required: [true, "Total price is required field!"]
    },
    bookingStatus: {
        type: String,
        default: "pending",
        lowercase: true,
        enum: {
            values: ["pending", "confirmed", "success"],
            message: "This status does not exist"
        }
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, "User is required"]
    },
    listingId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Listing',
        required: [true, "Listing is required"]
    },
    paymentId: { type: Schema.Types.ObjectId, ref: 'Payment' }
}, { timestamps: true });

// Payment Schema
const PaymentSchema = new Schema({
    order_id: {
        type: String,
        required: [true, "Order id is required field!"]
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment method is required field!"]
    },
    paymentStatus: {
        type: String,
        default: "pending",
        lowercase: true,
        enum: {
            values: ["pending", "success", "canceled"],
            message: "This status does not exist"
        }
    },
    amount: {
        type: Number,
        min: [0, 'Amount must be greater than or equal 0'],
        required: [true, "Amount is required field!"]
    },
    paidAt: {
        type: Date
    },
    bookingId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Booking',
        required: [true, "Booking is required"]
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, "User is required"]
    }
}, { timestamps: true });

// Review Schema
const ReviewSchema = new Schema({
    rating: {
        type: Number,
        min: [1, "Rating must be 1.0 or above"],
        max: [5, "Rating must be 5.0 or below"]
    },
    reviewText: {
        type: String,
        minlength: [5, "Review must be above 5 characters"],
        maxlength: [500, "Review must be below 500 characters"]
    },
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, "User is required"]
    },
    listingId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Listing',
        required: [true, "Listing is required"]
    },
}, { timestamps: true });

// Wishlist Schema
const WishlistSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, "User is required"]
    },
    listingId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Listing',
        required: [true, "Listing is required"]
    },
}, { timestamps: true });

// Export models
module.exports = {
    User: mongoose.model('User', UserSchema),
    Listing: mongoose.model('Listing', ListingSchema),
    Booking: mongoose.model('Booking', BookingSchema),
    Payment: mongoose.model('Payment', PaymentSchema),
    Review: mongoose.model('Review', ReviewSchema),
    Wishlist: mongoose.model('Wishlist', WishlistSchema),
    mongoose
};
