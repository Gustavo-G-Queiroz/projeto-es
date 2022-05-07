const bcrypt = require('bcryptjs')

exports.passBcrypt = function (ptpass) {
    return bcrypt.hash(ptpass, 10);
}

exports.comparePass = function(pass1, pass2) {
    return bcrypt.compare(pass1, pass2);
}