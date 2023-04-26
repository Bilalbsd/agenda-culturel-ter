module.exports.signUpErrors = (err) => {
    let errors = { email: '', password: '' };

    if (err.message.includes('email') && err.keyValue.email) {
        errors.email = 'Email incorrect';
    }

    if (err.message.includes('password')) {
        errors.password = 'Le mot de passe doit faire 6 caractères minimum';
    }

    if (err.code === 11000 && err.keyValue.email && err.keyValue.email !== '') {
        errors.email = 'Cet email est déjà enregistré';
    }

    return errors;
};





module.exports.signInErrors = (err) => {
    let errors = { email: '', password: '' }

    if (err.message.includes("email"))
        errors.email = "Email inconnu";

    if (err.message.includes('password'))
        errors.password = "Le mot de passe ne correspond pas"

    return errors;
}