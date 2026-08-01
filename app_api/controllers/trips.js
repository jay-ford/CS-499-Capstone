const Trip = require('../models/travlr');

/**
 * Convert a Mongoose or MongoDB error into a clear API response.
 */
const handleDatabaseError = (res, error) => {
    console.error('Database operation failed:', error);

    if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(
            validationError => validationError.message
        );

        return res.status(400).json({
            message: 'Trip validation failed',
            errors: validationErrors
        });
    }

    if (error.code === 11000) {
        return res.status(409).json({
            message: 'A trip with this trip code already exists'
        });
    }

    if (error.name === 'CastError') {
        return res.status(400).json({
            message: `Invalid value provided for ${error.path}`
        });
    }

    return res.status(500).json({
        message: 'An unexpected database error occurred'
    });
};

// GET: /trips
const tripsList = async (req, res) => {
    try {
        const trips = await Trip.find({}).exec();
        return res.status(200).json(trips);
    } catch (error) {
        return handleDatabaseError(res, error);
    }
};

// GET: /trips/:tripCode
const tripsFindByCode = async (req, res) => {
    try {
        const trips = await Trip
            .find({ code: req.params.tripCode.toUpperCase() })
            .exec();

        if (trips.length === 0) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        // Retain the array response because the Angular edit component
        // currently reads the requested trip from value[0].
        return res.status(200).json(trips);
    } catch (error) {
        return handleDatabaseError(res, error);
    }
};

// POST: /trips
const tripsAddTrip = async (req, res) => {
    try {
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        const savedTrip = await newTrip.save();
        return res.status(201).json(savedTrip);
    } catch (error) {
        return handleDatabaseError(res, error);
    }
};

// PUT: /trips/:tripCode
const tripsUpdateTrip = async (req, res) => {
    try {
        const updatedTrip = await Trip.findOneAndUpdate(
            { code: req.params.tripCode.toUpperCase() },
            {
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            },
            {
                new: true,
                runValidators: true,
                context: 'query'
            }
        ).exec();

        if (!updatedTrip) {
            return res.status(404).json({ message: 'Trip not found' });
        }

        return res.status(200).json(updatedTrip);
    } catch (error) {
        return handleDatabaseError(res, error);
    }
};

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip
};
