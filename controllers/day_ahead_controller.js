const fetch = require('cross-fetch');

exports.findAll = async (req, res) => {
    const start_date = req.params.start_date;
    const end_date = req.params.end_date;
    const region = req.params.region

    let url = `https://dashboard.elering.ee/api/nps/price?start=${start_date}&end=${end_date}`;

    await fetch(url).then(res => res.json())
        .then(data => {
                let data_pattern = '';
                if (region === 'ee') {
                    data_pattern = data.data.ee;
                } else if (region === 'fi') {
                    data_pattern = data.data.fi
                } else if (region === 'lv') {
                    data_pattern = data.data.lv
                } else if (region === 'lt') {
                    data_pattern = data.data.lt
                }

                res.send(data_pattern);
            }
        ).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred."
            })
        })
}
