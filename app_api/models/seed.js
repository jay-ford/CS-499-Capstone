// Bring in the database connection and Trip schema.
const mongoose = require('./db');
const Trip = require('./travlr');
const fs = require('fs');
const path = require('path');

// Read the seed data from the JSON file.
// Use __dirname so the seed script works regardless of the current terminal location.
const trips = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, '../../data/trips.json'),
        'utf8'
    )
);

const seedDB = async () => {
    try {
        await Trip.deleteMany({});
        await Trip.insertMany(trips);

        // Ensure MongoDB indexes match the schema declarations.
        await Trip.syncIndexes();

        console.log(`${trips.length} trips successfully added`);
        console.log('Trip indexes successfully synchronized');
    } catch (error) {
        console.error('Database seed failed:', error);
        process.exitCode = 1;
    } finally {
        await mongoose.connection.close();
    }
};

seedDB();