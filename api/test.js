module.exports = (req, res) => {
    const { test } = req.body
    res.json({
        body: test,
        query: req.query,
        cookies: req.cookies,
    });
};