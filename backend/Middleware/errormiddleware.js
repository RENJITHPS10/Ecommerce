const errormiddleware = (err, req, res, next) => {
    console.log(err)
    res.status(500).json({ message: err.message })

}
export default errormiddleware