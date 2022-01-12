$(document).ready(function () {

    $.ajax({
        url: '/api/EE/current',
        method: 'get',
        dataType: 'json',
        success: function (response) {

            let chart_label = [];
            let chart_data = [];

            for (let i in response) {
                if (response.hasOwnProperty(i)) {
                    const date = new Date(response[i].timestamp);
                    const year = date.getFullYear();
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const day = String(date.getDate()).padStart(2, '0');
                    const hours = date.getHours();
                    const minutes = "0" + date.getMinutes();
                    const seconds = "0" + date.getSeconds();

                    const formattedTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

                    chart_label.push(formattedTime);
                    chart_data.push(response[i].price);
                }
            }

            const ctx = document.getElementById("myChart").getContext("2d")

            const myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chart_label,
                    datasets: [
                        {
                            label: 'Стоимость электроэнергии',
                            data: chart_data,
                            borderColor: "#02897A",
                            backgroundColor: "#02897A",
                        }
                    ]
                },
                options: {
                    responsive: true,
                    display: true,
                },
            })
        },
        error: function (response) {
            console.log(response)
        }
    })
});