$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCBZJcUqFd7XVeQksx6ETJgFXHGmjQzoAc",
        authDomain: "train-schedule-8022d.firebaseapp.com",
        databaseURL: "https://train-schedule-8022d.firebaseio.com",
        storageBucket: "train-schedule-8022d.appspot.com",
    };

    firebase.initializeApp(config);

    var dataRef = firebase.database();

    // var time = 300;
    // var duration = moment.duration(time * 1000, 'milliseconds');
    // var interval = 60000;

    // var first_time;
    // var time_diff = moment().diff(first_time, 'minutes');
    // console.log(time_diff);
    // var remaining_time = (time / 60) - (time_diff % (time / 60));
    // console.log('time until next ' + remaining_time.toString());

    // $('.countdown').html('<h3>'+moment(duration.asMilliseconds()).format('hh:mm')+'</h3>');
    // $('.countdown').append('<h4>'+remaining_time+'</h4>');

    // console.log(dataRef.ref());

    // dataRef.ref().set({});

    dataRef.ref('trains').on("child_added", function(childSnapshot) {

        var servicenumber = childSnapshot.val().servicenumber;
        var arrivingfrom = childSnapshot.val().arrivingfrom;
        var frequency = childSnapshot.val().frequency;
        var freq_readable = moment(frequency, 'minutes').format('hh:mm');
        var firsttraintime = childSnapshot.val().firsttraintime;

        var then = moment(firsttraintime, 'hh:mm').subtract(1, 'days').format();
        console.log(moment(firsttraintime, 'hh:mm').subtract(1, 'days').format('ddd HH:mm'));
        var difference = moment().diff(then, 'minutes');
        var minutesaway = frequency - (difference % frequency);
        var nextarrival = moment().add(minutesaway, 'minutes').format('ddd HH:mm');


        var $newRow = $("<tr class=\"train\"></tr>");
        var $servicenumber = $("<td class=\"service-number\">" + servicenumber + "</td>");
        var $arrivingfrom = $("<td class=\"arriving-from\">" + arrivingfrom + "</td>");
        // var $frequency = $("<td class=\"frequency\">" + freq_readable + "</td>");
        var $frequency = $("<td class=\"frequency\">" + frequency + "</td>");
        var $nextarrival = $("<td class=\"next-arrival\">" + nextarrival + "</td>");
        var $minutesaway = $("<td class=\"monthly-rate\">" + minutesaway + "</td>");


        $newRow.append($servicenumber)
                .append($arrivingfrom)
                .append($frequency)
                .append($nextarrival)
                .append($minutesaway)

        $("tbody").append($newRow);


        return false;

    }, function(errorObject) {

            console.log("The add failed: " + errorObject.code);

    });


    var frequency = 45;
    var then = moment('12:38', 'hh:mm').subtract(1, 'days').format();
    var now = moment();
    var difference = now.diff(then, 'minutes');


    // setInterval(function(){

    //     duration = moment.duration(duration.asMilliseconds() - interval, 'milliseconds');

    //     time_diff = moment().diff(first_time, 'minutes');
    //     remaining_time = (time / 60) - (time_diff % (time / 60));

    //     if(duration._milliseconds === -60000) {
    //         duration = moment.duration(time * 1000, 'milliseconds');
    //     }

    //     console.log(duration._milliseconds);

    //     $('.countdown').html('<h3>'+moment(duration.asMilliseconds()).format('hh:mm')+'</h3>');
    //     $('.countdown').append('<h4>'+remaining_time+'</h4>');

    // }, interval);


    $(document).on("click", "#addtrain", function() {

        var $servicenumberinput = $("#servicenumberinput").val().trim();
        var $arrivingfrominput = $("#arrivingfrominput").val().trim();
        var $firsttraintimeinput = $("#firsttraintimeinput").val().trim();
        var $frequencyinput = $("#frequencyinput").val().trim();
        // var $nextarrivalinput = $("#nextarrivalinput").val().trim();
        // var $nextarrivalinput = '2:30';
        // var $minutesawayinput = $("#minutesawayinput").val().trim();
        // var $minutesawayinput = '45';

        dataRef.ref('trains').push({
            servicenumber: $servicenumberinput,
            arrivingfrom: $arrivingfrominput,
            firsttraintime: $firsttraintimeinput,
            frequency: $frequencyinput,
            // nextarrival: $nextarrival,
            // minutesaway: $minutesaway
        });

    });

});