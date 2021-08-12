const hello = (req, res) => {
    res.status('200').json({ message: 'back to export default' });
}

export default hello