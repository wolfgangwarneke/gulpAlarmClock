var AlarmClock = require('./../js/alarmclock.js').alarmClockModule;

$(document).ready(function(){
  var newAlarmClock = new AlarmClock();
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
    if (newAlarmClock.alarmRing === true) {
      newAlarmClock.turnOffAlarm();
      newAlarmClock.alarmTime = null;
      $('#alarmMessage').text('Alarm was turned off. Just go back to sleep.');
    }
  });
});
