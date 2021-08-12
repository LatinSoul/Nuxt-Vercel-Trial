// const hello = (req, res) => {
//     res.status('200').json({ message: 'Still works!' });
// }

// export default hello
module.exports.hello = (req, res) => {
    res.status('200').json({ message: 'module.exports.hello' });
}