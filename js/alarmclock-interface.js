var AlarmClock = require('./../js/alarmclock.js').alarmClockModule;

$(document).ready(function(){
  var newAlarmClock = new AlarmClock();
  setInterval(function() {
    var currentTimeDigits = newAlarmClock.refreshTime().split("");
    for ( i = 0 ; i < 5 ; i ++ ) {
      $(".digit").eq(i).text(currentTimeDigits[i]);
    }
  }, 1000);

});
