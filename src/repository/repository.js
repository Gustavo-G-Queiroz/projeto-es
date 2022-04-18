exports.create = function (Model) {
    return new Promise((resolve, reject) => {
        Model.save(function (err, data) {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
}


exports.list = function (Model) {
    return new Promise((resolve, reject) => {
        Model.find({})
          .exec(function(err, data) {
            if (err) reject(err);
            resolve(data);
          });
      });
}

exports.findById = function (Model, id) {
    return new Promise((resolve, reject) => {
        Model.findById(id)
          .exec(function(err, data) {
            if (err) reject(err);
            resolve(data);
          });
      });
}
