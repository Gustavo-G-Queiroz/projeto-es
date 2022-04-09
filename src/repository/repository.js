function create(Model) {
    return new Promise((resolve, reject) => {
        Model.save(function (err, user) {
            if (err) {
                reject(err);
            }
            resolve(user);
        });
    });
}


function list(Model, queryParams) {
    return new Promise((resolve, reject) => {
        Model.find({})
            .limit(parseInt(queryParams.limit))
            .exec(function (err, data) {
                if (err) reject(err);
                resolve(data);
            });
    });
}
