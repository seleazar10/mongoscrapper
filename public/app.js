


$('.btno').on('click', function () {

    console.log('btno clicked')


    $.getJSON('/all', function (data) {

        for (var i = 0; i < data.length; i++) {

            console.log(data[i].header);
            console.log(data[i].link);

            $('#result').append('<tr><th>' + data[i].header + '</th>' +
                '<th>' + data[i].link + '</th></tr>')
        }



    });


});
