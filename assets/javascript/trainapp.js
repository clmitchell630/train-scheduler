//Pseudo
//page will draw information from firebase and update the page with stored data
//form will accept inputs from user, when submit is clicked.... magic
//magic part 1 = inputs will be captured and form will be reset.
//magic part 2 = captured inputs will be sent to the database
//magic part 3 = page will dynamically update with information from database

//set up time math and Moment.js

$(function () {

    // firebase setup
    const firebaseConfig = {
        apiKey: "AIzaSyDI5gmTb2_YLj95bvO27wvumaa_-AiWHYk",
        authDomain: "train-scheduler-unit7.firebaseapp.com",
        databaseURL: "https://train-scheduler-unit7.firebaseio.com",
        projectId: "train-scheduler-unit7",
        storageBucket: "train-scheduler-unit7.appspot.com",
        messagingSenderId: "809687632300",
        appId: "1:809687632300:web:ac7d559563bc1f5a"
    };

    firebase.initializeApp(firebaseConfig);
    //------variables-------
    var database = firebase.database();

    //form submit button
    $("#submit").on("click", dataPush);

    //database listener
    database.ref().on("child_added", function (snapshot) {
        var name = snapshot.val().name;
        var city = snapshot.val().city;
        var time = snapshot.val().time;
        var freq = parseInt(snapshot.val().frequency);

        //time maths
        var tFormated = moment(time, "HH:mm").subtract(1, "years");
        var tDiff = moment().diff(moment(tFormated), "minutes");
        var tRemain = tDiff % freq;
        var tMinusTrains = freq - tRemain;
        var nextTrain = moment().add(tMinusTrains, "minutes");


        var newTr = $("<tr>").append(
            $("<td>").text(name),
            $("<td>").text(city),
            $("<td>").text(freq),
            $("<td>").text(moment(nextTrain).format("hh:mm")),
            $("<td>").text(tMinusTrains + " minutes"),
        );

        $("#trainTable > tbody").append(newTr);
    });
    //------functions------

    //database push
    function dataPush(e) {
            e.preventDefault();

            var name = $("#name").val().trim();
            var city = $("#city").val().trim();
            var time = moment($("#time").val().trim(), "hh:mm").format("HH:mm");
            var freq = $("#freq").val().trim();

            database.ref().push({
                name: name,
                city: city,
                time: time,
                frequency: freq
            });

            $("#name").val("");
            $("#city").val("");
            $("#time").val("");
            $("#freq").val("");

        }
});