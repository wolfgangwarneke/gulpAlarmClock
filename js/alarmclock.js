function AlarmClock() {
  this.currentTime = moment().format("HH:mm");
  this.alarmTime = null;
  this.keepingTime = true;
  this.alarmRing = false;
}

AlarmClock.prototype.setAlarm = function(time) {
  this.alarmTime = time;
};

AlarmClock.prototype.triggerAlarm = function() {
  this.alarmRing = true;
};

AlarmClock.prototype.turnOffAlarm = function() {
  this.alarmRing = false;
  this.alarmTime = null;
};

AlarmClock.prototype.snooze = function(minutesAmt) {
  this.alarmTime = moment().add(minutesAmt, 'minutes').format("HH:mm");
  this.alarmRing = false;
};

AlarmClock.prototype.refreshTime = function() {
    this.currentTime = moment().format("HH:mm");
    return this.currentTime;
};

exports.alarmClockModule = AlarmClock;
