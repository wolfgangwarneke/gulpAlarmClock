function AlarmClock() {
  this.currentTime = moment().format("HH:mm");
  this.alarmTime = null;
  this.keepingTime = true;
}

AlarmClock.prototype.setAlarm = function(time) {
  this.alarmTime = time;
}

AlarmClock.prototype.refreshTime = function() {
    this.currentTime = moment().format("HH:mm");
    return this.currentTime;
}

exports.alarmClockModule = AlarmClock;
