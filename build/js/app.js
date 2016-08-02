(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"./../js/alarmclock.js":1}]},{},[2]);
