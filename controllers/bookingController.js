const Booking = require('../models/booking');
const Listing = require('../models/listing');

// Create Booking
module.exports.createBooking = async (req, res, next) => {
    try {
        const { checkIn, checkOut, guests } = req.body.booking;
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            req.flash('error', 'Listing not found');
            return res.redirect('/listings');
        }

        const start = new Date(checkIn);
        const end = new Date(checkOut);
        const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

        const pricePerNight = listing.price + Math.round(listing.price * 0.18);
        const totalPrice = pricePerNight * nights;

        const booking = new Booking({
            listing: listing._id,
            user: req.user._id,
            checkIn,
            checkOut,
            guests,
            pricePerNight,
            totalPrice,
            nights
        });

        await booking.save();
        await booking.populate('listing');

        res.render('bookings/confirmation', { booking });
    } catch (err) {
        next(err);
    }
};
