module.exports = {
    conectar: function () {
        const mongoose = require('mongoose')
        const url = process.env.DATABASE_URL;

        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }

        mongoose.connect(url, connectionParams)
            .then(() => {
                console.log('Conectando ao banco de dados')
            })
            .catch((err) => {
                console.error(`falha na conexão com o banco. \n${err}`);
            })

        return mongoose.connection;
    }
};
