const hello = (req, res) => {
    res.status('200').json({ message: 'Still works!' });
}

export default hello