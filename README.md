# train-scheduler

This app will allow you to keep track of multiple different trains (imaginary or real) at the same time! From any computer!

## how to use

*   Fill out the form according to the information requested within the form.
*   Click submit to add your train to the schedule.
*   The page refreshes automatically every 60 seconds.
    -   utilize the stop/resume buttons to control the refresh.

## Pseudo

*   page will draw information from firebase and update the page with stored data
*   form will accept inputs from user, when submit is clicked.... magic
    -   magic part 1 = inputs will be captured and form will be reset.
    -   magic part 2 = captured inputs will be sent to the database
    -   magic part 3 = page will dynamically update with information from database

*   set up time math and Moment.js