(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
  var search = this.refreshTime();
  this.alarmRing = false;
  for (var i=this.alarmTime.length-1; i>=0; i--) {
      if (this.alarmTime[i] === search) {
          this.alarmTime.splice(i, 1);
      }
  }
  this.alarmTime.push(moment().add(minutesAmt, 'minutes').format("HH:mm"));
  this.alarmRing = false;
};

AlarmClock.prototype.refreshTime = function() {
    this.currentTime = moment().format("HH:mm");
    return this.currentTime;
};

exports.alarmClockModule = AlarmClock;

},{}],2:[function(require,module,exports){
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

  var c = document.getElementById("analogClock");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.arc(250,250,200,0,2*Math.PI);
  ctx.stroke();
  ctx.closePath();
  setInterval(function() {

    var x = 250;
    var y = 250;
    var ctx = c.getContext("2d");
    var second = parseInt(moment().format("ss"));
    var minute = parseInt(moment().format("m"));
    // if (second < 30 ) {
    //   x = 250 + ( Math.abs(second-15) * 13.333 );
    // } else if(second < 60 ) {
    //   x = 50 + ( Math.abs(second-15) * 13.333 );
    // }
    if ( second <= 15) {
      y = 50 + ( second * 13.333 );
      x = 250 + ( second * 13.333 );
    } else if(second <= 30) {
      y = 250 + ( (second-15) * 13.333 );
      x = 450 - ( (second-15) * 13.333 );
    } else if(second <= 45) {
      y = 450 - ( (second-30) * 13.333 );
      x = 250 - ( (second-30) * 13.333 );
    } else {
      y = 250 - ( (second-45) * 13.333 );
      x = 50 + ( (second-45) * 13.333);
    };
    ctx.beginPath();
    ctx.moveTo(250,250);
    ctx.lineTo(x,y);
    ctx.strokeStyle="#000";
    console.log(second + " seconds x:" + x + " y:" + y );
    ctx.stroke();
    ctx.closePath();

    var minuteX = 250;
    var minuteY = 250;
    var previousMinuteX = 250;
    var previousMinuteY = 250;
    if (minute <= 15) {
      minuteY = 50 + ( minute * 13.333 );
      minuteX = 250 + ( minute * 13.333 );
    } else if(minute <= 30) {
      minuteY = 250 + ( (minute-15) * 13.333 );
      minuteX = 450 - ( (minute-15) * 13.333 );
    } else if(minute <= 45) {
      minuteY = 450 - ( (minute-30) * 13.333 );
      minuteX = 250 - ( (minute-30) * 13.333 );
    } else {
      minuteY = 250 - ( (minute-45) * 13.333 );
      minuteX = 50 + ( (minute-45) * 13.333);
    };
    ctx.beginPath();
    ctx.strokeStyle="#F00";
    ctx.moveTo(250,250);
    ctx.lineTo(minuteX,minuteY);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.strokeStyle="#000";
    ctx.moveTo(250,250);
    ctx.lineTo(previousMinuteX,previousMinuteY);
    ctx.stroke();
    ctx.closePath();

    previousMinuteY = minuteY;
    previousMinuteX = minuteX;

  }, 500);

});

},{"./../js/alarmclock.js":1}]},{},[2]);
