var AlarmClock = require('./../js/alarmclock.js').alarmClockModule;
var newAlarmClock = new AlarmClock();

$(document).ready(function(){

  setInterval(function() {
    var currentTimeDigits = newAlarmClock.refreshTime().split("");
    for ( i = 0 ; i < 5 ; i ++ ) {
      $(".digit").eq(i).text(currentTimeDigits[i]);
    }
    if (newAlarmClock.currentTime === newAlarmClock.alarmTime) {
      newAlarmClock.triggerAlarm();
      $('#alarmMessage').text('ALARM IS GOING OFF');
    }
  }, 1000);
  
  $('.set-alarm').submit(function(event) {
    event.preventDefault();
    var newAlarmTime = $('input#set-alarm').val();
    console.log(newAlarmTime);
    newAlarmClock.setAlarm(newAlarmTime);
  });

  $('.turn-off-alarm').submit(function(event) {
    event.preventDefault();
    console.log("click");
    if (newAlarmClock.alarmRing === true) {
      console.log("alarmRing is true");
      newAlarmClock.turnOffAlarm();
      $('#alarmMessage').text('Alarm was turned off. GET UP AND OUT OF BED!');
    }
  });

  $('.snooze').submit(function(event) {
    event.preventDefault();
    if (newAlarmClock.alarmRing === true) {
      newAlarmClock.snooze();
      $('#alarmMessage').text('Sssshhh.  Go back to sleeeeep.');
    }
  });

});
