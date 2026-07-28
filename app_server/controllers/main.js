/**
 * Main website controller.
 * Handles requests for the customer-facing pages and renders the
 * corresponding Handlebars views using the Express view engine.
 */

const index = (req, res) => {
    res.render('index', { title: 'Travlr Getaways' });
};

const about = (req, res) => {
    res.render('about', {
        title: 'About - Travlr Getaways'
    });
};

const rooms = (req, res) => {
    res.render('rooms', {
        title: 'Rooms - Travlr Getaways'
    });
};

const meals = (req, res) => {
    res.render('meals', {
        title: 'Meals - Travlr Getaways'
    });
};

const news = (req, res) => {
    res.render('news', {
        title: 'News - Travlr Getaways'
    });
};

const contact = (req, res) => {
    res.render('contact', {
        title: 'Contact - Travlr Getaways'
    });
};

module.exports = {
    index,
    about,
    rooms,
    meals,
    news,
    contact
};