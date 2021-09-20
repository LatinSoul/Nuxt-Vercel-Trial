// Error handler
function errorHandler(err) {
    // console.log(err.message, err.code)
    const errors = { email: '', password: '' }
    // validating unique user registration
    // this check comes first, as if the email is already in use, there is no need to validate it at first place!
    if (err.code === 11000) {
        errors.email = 'Email already registered.'
        return errors
    }
    // validating inputs errors 
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    } else {
        errors.null = `User doesn't exist`
    }
    return errors
}

export default errorHandler