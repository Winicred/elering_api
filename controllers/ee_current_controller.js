const fetch = require('cross-fetch');
const sequelize = require('../config/database');
const initModels = require('../models/init-models');

const models = initModels(sequelize);

exports.create = async (req, res) => {
    let url = "https://dashboard.elering.ee/api/nps/price/EE/current";

    await fetch(url)
        .then(data => {
                const date = new Date(data.data[0].timestamp * 1000);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const day = String(date.getDate()).padStart(2, '0');
                const hours = date.getHours();
                const minutes = "0" + date.getMinutes();
                const seconds = "0" + date.getSeconds();

                const formatted_time = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                let ee_current = {
                    timestamp: formatted_time,
                    price: data.data[0].price
                };

                models.ee_current.create(ee_current);

                res.send(data);
            }
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            })
        })
}

exports.findAll = (req, res) => {
    models.ee_current.findAll({order: [['id', 'ASC'], ['timestamp', 'ASC']]}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred."
        })
    })
}
