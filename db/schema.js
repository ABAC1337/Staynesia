const mongoose = require('mongoose');
const { Schema } = mongoose;

// Guest Schema
const GuestSchema = new Schema({
    name: {
        type : String,
        require : true
    },
    username: {
        type : String,
        require : true
    },
    email: {
        type: String,
        require : true,
        unique: true,
    },
    hashPassword: {
        type : String,
        require : true
    },
    imageUrl: String,
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    wishlists: [{ type: Schema.Types.ObjectId, ref: 'Wishlist' }]
}, { timestamps: true });

// Host Schema
const HostSchema = new Schema({
    name: {
        type : String,
        require : true
    },
    username: {
        type : String,
        require : true
    },
    email: {
        type: String,
        require : true,
        unique: true,
    },
    hashPassword: {
        type : String,
        require : true
    },
    imageUrl: String,
    listings: [{ type: Schema.Types.ObjectId, ref: 'Listing' }]
}, { timestamps: true });

// Listing Schema
const ListingSchema = new Schema({
    location : {
        province : {
            type : String
        },
        city : {
            type : String
        },
        require : true
    },
    category: {
        type : String,
        require : true
    },
    title: {
        type : String,
        require : true
    },
    description: {
        type: String,
        required: true
    },
    imgUrl: {
        type : [String],
        require : true
    },
    facility: {
        type : [String],
        require : true
    },
    capacity: {
        type : Number,
        require : true
    }, 
    price: {
        type : Number,
        require : true
    },
    bookings: [{ type: Schema.Types.ObjectId, ref: 'Booking' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    wishlists: [{ type: Schema.Types.ObjectId, ref: 'Wishlist' }]
}, { timestamps: true });



// Booking Schema
const BookingSchema = new Schema({
    guestId: { type: Schema.Types.ObjectId, ref: 'Guest' },
    listingId: { type: Schema.Types.ObjectId, ref: 'Listing' },
    checkIn: {
        type : Date,
        require : true
    },
    checkOut: {
        type : Date,
        require : true
    },
    totalPrice: {
        type : Number,
        require : true
    },
    status: String,
    payment: [{ type: Schema.Types.ObjectId, ref: 'Payment' }]
}, { timestamps: true });

// Payment Schema
const PaymentSchema = new Schema({
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking' },
    paymentMethod: {
        type : Number,
        require : true
    },
    paymentStatus: String,
    amount: {
        type : Number,
        require : true
    },
    paidAt: {
        type : Number
    }
}, { timestamps: true });

// Review Schema
const ReviewSchema = new Schema({
    guestId: { type: Schema.Types.ObjectId, ref: 'Guest' },
    listingId: { type: Schema.Types.ObjectId, ref: 'Listing' },
    rating: Number,
    reviews: String
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
