var AlarmClock = require('./../js/alarmclock.js').alarmClockModule;

$(document).ready(function(){
  var newAlarmClock = new AlarmClock();
  
  setInterval(function() {
    var currentTimeDigits = newAlarmClock.refreshTime().split("");
    for ( i = 0 ; i < 5 ; i ++ ) {
      $(".digit").eq(i).text(currentTimeDigits[i]);
    }
    newAlarmClock.alarmTime.forEach(function(time) {
      if (newAlarmClock.currentTime === time) {
        newAlarmClock.triggerAlarm();
        $('#alarmMessage').text('ALARM IS GOING OFF');
      }
    });
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
      newAlarmClock.snooze(parseInt($('#minutes').val()));
      $('#alarmMessage').text('Sssshhh.  Go back to sleeeeep.');
    }
  });

});
