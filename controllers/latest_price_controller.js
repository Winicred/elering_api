const fetch = require('cross-fetch');

exports.findAll = async (req, res) => {
    const region = req.params.region

    let url = `https://dashboard.elering.ee/api/nps/turnover/${region}/latest`;

    await fetch(url).then(res => res.json())
        .then(data => {
                res.send(data.data[0]);
            }
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            })
        })
}
