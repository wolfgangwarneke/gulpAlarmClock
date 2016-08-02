function AlarmClock() {
  this.currentTime = moment().format("HH:mm");
  this.alarmTime = [];
  this.keepingTime = true;
  this.alarmRing = false;
}

AlarmClock.prototype.setAlarm = function(time) {
  this.alarmTime.push(time);
};

AlarmClock.prototype.triggerAlarm = function() {
  this.alarmRing = true;
};

AlarmClock.prototype.turnOffAlarm = function() {
  var search = this.refreshTime();
  this.alarmRing = false;
  for (var i=this.alarmTime.length-1; i>=0; i--) {
      if (this.alarmTime[i] === search) {
          this.alarmTime.splice(i, 1);
      }
  }
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
