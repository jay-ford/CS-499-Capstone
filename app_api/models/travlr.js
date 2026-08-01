const mongoose = require('mongoose');

// Define the trip schema with validation and indexing.
const tripSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, 'Trip code is required'],
        trim: true,
        uppercase: true,
        minlength: [3, 'Trip code must contain at least 3 characters'],
        maxlength: [20, 'Trip code cannot exceed 20 characters']
    },

    name: {
        type: String,
        required: [true, 'Trip name is required'],
        trim: true,
        minlength: [3, 'Trip name must contain at least 3 characters'],
        maxlength: [100, 'Trip name cannot exceed 100 characters']
    },

    length: {
        type: String,
        required: [true, 'Trip length is required'],
        trim: true,
        maxlength: [50, 'Trip length cannot exceed 50 characters']
    },

    start: {
        type: Date,
        required: [true, 'Trip start date is required']
    },

    resort: {
        type: String,
        required: [true, 'Resort is required'],
        trim: true,
        minlength: [2, 'Resort must contain at least 2 characters'],
        maxlength: [100, 'Resort cannot exceed 100 characters']
    },

    perPerson: {
        type: String,
        required: [true, 'Price per person is required'],
        trim: true,
        maxlength: [30, 'Price per person cannot exceed 30 characters']
    },

    image: {
        type: String,
        required: [true, 'Trip image is required'],
        trim: true,
        maxlength: [255, 'Image filename cannot exceed 255 characters']
    },

    description: {
        type: String,
        required: [true, 'Trip description is required'],
        trim: true,
        minlength: [10, 'Trip description must contain at least 10 characters'],
        maxlength: [2000, 'Trip description cannot exceed 2000 characters']
    }
});

// Create a unique index for trip codes.
tripSchema.index(
    { code: 1 },
    { unique: true, name: 'unique_trip_code' }
);

// Create an index for trip names.
tripSchema.index(
    { name: 1 },
    { name: 'trip_name_lookup' }
);

// Create an index for resorts.
tripSchema.index(
    { resort: 1 },
    { name: 'resort_lookup' }
);

// Create an index for trip start dates.
tripSchema.index(
    { start: 1 },
    { name: 'trip_start_date_lookup' }
);

const Trip = mongoose.model('trips', tripSchema);

module.exports = Trip;