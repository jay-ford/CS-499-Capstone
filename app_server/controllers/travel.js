/**
 * Travel page controller.
 * Retrieves trip data from the Travlr Getaways API and renders the
 * Travel Handlebars view using the Express view engine.
 */

const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
    method: 'GET',
    headers: {
        Accept: 'application/json'
    }
};

const travel = async function (req, res, next) {
    await fetch(tripsEndpoint, options)
        .then(response => response.json())
        .then(json => {
            let message = null;

            if (!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            } else if (!json.length) {
                message = 'No trips exist in our database!';
            }

            res.render('travel', {
                title: 'Travel - Travlr Getaways',
                trips: json
            });
        })
        .catch(error => {
            res.status(500).send(error.message);
        });
};

module.exports = {
    travel
};