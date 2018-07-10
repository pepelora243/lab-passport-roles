const hasRole = (role) =>  {
    return (req,res, next) => {
    if (req.user.role.includes(role)) {
        next();

    }
    else {
        req.flash('error','You do not have the role Boss')
        res.redirect("/")
    }
    }
}

module.exports = hasRole;