$(document).ready(function () {

    function convert_date(time, is_timestamp = false, is_short = false) {
        let date;
        if (is_timestamp) {
            date = new Date(time * 1000);
        } else {
            date = new Date(time);
        }

        const hours = date.getHours();
        const minutes = "0" + date.getMinutes();
        const seconds = "0" + date.getSeconds();

        if (!is_short) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');

            return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
        }

        return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2)
    }

    $('#ee_current').hide();
    $('#day_ahead_price').hide();
    $('#latest_price').hide();
    $('#volumes_data').hide();

    $('#ee_current_table').hide();
    $('#day_ahead_price_table').hide();
    $('#latest_price_table').hide();
    $('#volumes_data_table').hide();

    $('#ee_current_options').hide();
    $('#day_ahead_price_options').hide();
    $('#latest_price_table_options').hide();
    $('#volumes_data_options').hide();

    $("#select_option").change(function () {
        const option = $(this).val();
        let content = '';

        if (option === "1") {

            $('#ee_current').show(300);
            $('#day_ahead_price').hide();
            $('#latest_price').hide();
            $('#volumes_data').hide();

            $(".remove_date").on('click', function () {
                if ($(".remove_date").is(':checked')) {
                    $('#ee_current_table td:nth-child(2),th:nth-child(2)').hide(300);
                } else {
                    $('#ee_current_table td:nth-child(2),th:nth-child(2)').show(300);
                }
            })

            $(".remove_price").on('click', function () {
                if ($(".remove_price").is(':checked')) {
                    $('#ee_current_table td:nth-child(3),th:nth-child(3)').hide(300);
                } else {
                    $('#ee_current_table td:nth-child(3),th:nth-child(3)').show(300);
                }
            })

            const ee_current_table_data = ['Дата', 'Цена']

            $('#ee_current_submit').on('click', function () {
                $.ajax({
                    url: '/api/EE/current',
                    method: 'get',
                    dataType: 'json',
                    async: true,
                    success: function (response) {
                        $('#ee_current_table').empty();
                        content = '';

                        content += '<thead><tr>';
                        for (let i = 0; i < ee_current_table_data.length; i++) {
                            content += '<th>' + ee_current_table_data[i] + '</th>';
                        }
                        content += '</tr></thead>';

                        content += '<tbody>'
                        for (let i = 0; i < response.length; i++) {
                            const end_date = convert_date(response[i].timestamp)

                            content += '<tr><td>' + end_date + '</td>'
                            content += '<td>' + response[i].price + '</td></tr>'
                        }
                        content += '</tbody>'

                        $('#ee_current_table').append(content).show();
                        $('#ee_current_options').show();
                    },
                    error: function (response) {
                        console.log(response);
                    }
                });
            })
        } else if (option === "2") {
            $('#ee_current').hide();
            $('#day_ahead_price').show(300);
            $('#latest_price').hide();
            $('#volumes_data').hide();

            $(".remove_date").on('click', function () {
                if ($(".remove_date").is(':checked')) {
                    $('#day_ahead_price_table td:nth-child(2),th:nth-child(2)').hide(300);
                } else {
                    $('#day_ahead_price_table td:nth-child(2),th:nth-child(2)').show(300);
                }
            })

            $(".remove_price").on('click', function () {
                if ($(".remove_price").is(':checked')) {
                    $('#day_ahead_price_table td:nth-child(3),th:nth-child(3)').hide(300);
                } else {
                    $('#day_ahead_price_table td:nth-child(3),th:nth-child(3)').show(300);
                }
            })

            $('#day_ahead_price_submit').on('click', function () {
                let start_date_format = new Date($('#day_ahead_price_start_date').val())
                let end_date_format = new Date($('#day_ahead_price_end_date').val())

                let start_date = start_date_format.getFullYear() + "-" + String(start_date_format.getMonth() + 1).padStart(2, '0') + "-" + String(start_date_format.getDate()).padStart(2, '0') + " " + (start_date_format.getHours() < 10 ? '0' : '') + start_date_format.getHours() + ":" + (start_date_format.getMinutes() < 10 ? '0' : '') + start_date_format.getMinutes();
                let end_date = end_date_format.getFullYear() + "-" + String(end_date_format.getMonth() + 1).padStart(2, '0') + "-" + String(end_date_format.getDate()).padStart(2, '0') + " " + (end_date_format.getHours() < 10 ? '0' : '') + end_date_format.getHours() + ":" + (end_date_format.getMinutes() < 10 ? '0' : '') + end_date_format.getMinutes();
                let region = $('#day_ahead_region').val();

                const day_ahead_price_data = ['Дата', 'Цена']

                $.ajax({
                    url: '/api/day-ahead/' + start_date + "/" + end_date + "/" + region,
                    method: 'get',
                    dataType: 'json',
                    success: function (response) {
                        $('#day_ahead_price_table').empty();
                        content = '';

                        content += '<thead><tr>';
                        for (let i = 0; i < day_ahead_price_data.length; i++) {
                            content += '<th>' + day_ahead_price_data[i] + '</th>';
                        }
                        content += '</tr></thead>';

                        content += '<tbody>'
                        for (let i = 0; i < response.length; i++) {
                            const end_date = convert_date(response[i].timestamp, true)

                            content += '<tr><td>' + end_date + '</td>'
                            content += '<td>' + response[i].price + '</td></tr>'
                        }
                        content += '</tbody>'

                        $('#day_ahead_price_table').append(content).show();
                        $('#day_ahead_price_options').show();
                    },
                    error: function (response) {
                        console.log(response);
                    }
                });
            })

        } else if (option === "3") {
            $('#ee_current').hide();
            $('#day_ahead_price').hide();
            $('#latest_price').hide();
            $('#volumes_data').show(300);

            const volumes_data_data = ['Дата', 'Закупочная цена', 'Продажная цена']

            $(".remove_date").on('click', function () {
                if ($(".remove_date").is(':checked')) {
                    $('#volumes_data_table td:nth-child(1),th:nth-child(1)').hide(300);
                } else {
                    $('#volumes_data_table td:nth-child(1),th:nth-child(1)').show(300);
                }
            })

            $(".remove_in").on('click', function () {
                if ($(".remove_in").is(':checked')) {
                    $('#volumes_data_table td:nth-child(2),th:nth-child(2)').hide(300);
                } else {
                    $('#volumes_data_table td:nth-child(2),th:nth-child(2)').show(300);
                }
            })

            $(".remove_out").on('click', function () {
                if ($(".remove_out").is(':checked')) {
                    $('#volumes_data_table td:nth-child(3),th:nth-child(3)').hide(300);
                } else {
                    $('#volumes_data_table td:nth-child(3),th:nth-child(3)').show(300);
                }
            })

            let region = $('#volumes_data_region').val();

            $('#volumes_data_submit').on('click', function () {
                $.ajax({
                    url: '/api/latest/' + region,
                    method: 'get',
                    dataType: 'json',
                    success: function (response) {
                        console.log(response)
                        $('#volumes_data_table').empty();
                        content = '';

                        content += '<thead><tr>';
                        for (let i = 0; i < volumes_data_data.length; i++) {
                            content += '<th>' + volumes_data_data[i] + '</th>';
                        }
                        content += '</tr></thead>';

                        content += '<tbody>'

                        const end_date = convert_date(response.timestamp, true)

                        content += '<tr><td>' + end_date + '</td>'
                        content += '<td>' + response.in + '</td>'
                        content += '<td>' + response.out + '</td></tr>'
                        content += '</tbody>'

                        $('#volumes_data_table').append(content).show();
                        $('#volumes_data_options').show();
                    },
                    error: function (response) {
                        console.log(response);
                    }
                });
            })
        }
    });
});