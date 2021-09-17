module.exports = (req, res) => {
    // const {test}=req.body
    res.json({
        body: req.body,
        query: req.query,
        cookies: req.cookies,
    });
};