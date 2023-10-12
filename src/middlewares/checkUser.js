module.exports = (req, res, next) => {
    if (localStorage.getItem('LowCostToken')) {
        return next(); // El usuario está autenticado, permite el acceso a la ruta.
    }

    return res.redirect('/');
}