// Displays homepage
async function getHomepage(req, res, next) {
    try {
        res.render('index', {
            title: 'Secret Message Club'
        });

    } catch (err) {
        next(err);
    };
};

module.exports = {
    getHomepage,
};