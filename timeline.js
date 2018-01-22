function timeline() {
    this.setPosition = _setPosition;
    this.setColor = _setColor;
    this.setTime = _setTime;
    this.setSpeed = _setSpeed;
    this.create = _create;
    this.start = _start;
    this.pause = _pause;
    this.getTime = _getTime;
    this.callback = _callback;

}

var _circleColor, _circleShadowColor, _backgroundGradientInnerColor, _backgroundGradientOuterColor, _dateColor, _timeColor, _year, _month, _day, _hour, _min, _sec, _milsec, _speed, _marginleft, _margintop, _div;




var _setPosition = (function (marginleft, margintop) { _marginleft = marginleft; _margintop = margintop; })
var _setColor = (function (circleColor, circleShadowColor, backgroundGradientInnerColor, backgroundGradientOuterColor, dateColor, timeColor) {
    if (circleColor == null || circleColor == "") { _circleColor = 'rgba(225,225,100,1)' } else { _circleColor = circleColor; }
    if (circleShadowColor == null || circleShadowColor == "") { _circleShadowColor = '#ECECFF' } else { _circleShadowColor = circleShadowColor; }
    if (backgroundGradientInnerColor == null || backgroundGradientInnerColor == "") { _backgroundGradientInnerColor = '#03303a' } else { _backgroundGradientInnerColor = backgroundGradientInnerColor; }
    if (backgroundGradientOuterColor == null || backgroundGradientOuterColor == "") { _backgroundGradientOuterColor = 'black' } else { _backgroundGradientOuterColor = backgroundGradientOuterColor; }
    if (dateColor == null || dateColor == "") { _dateColor = 'rgba(128, 255, 255, 1)' } else { _dateColor = dateColor; }
    if (timeColor == null || timeColor == "") { _timeColor = 'rgba(128, 255, 255, 1)' } else { _timeColor = timeColor; }
})

var _setTime = (function (dateString) {
    var time;
    if (new Date(dateString)) { time = new Date(dateString); } else { time = new Date(); }
    _year = time.getFullYear();
    _month = time.getMonth() + 1;
    _day = time.getDate();
    _hour = time.getHours();
    _min = time.getMinutes();
    _sec = time.getSeconds();
})

var _setSpeed = (function (speed) { _speed = speed })
var _getTime = (function () { var timeObj = {}; timeObj["year"] = _year; timeObj["month"] = _month - 1; timeObj["day"] = _day; timeObj["hour"] = _hour; timeObj["minute"] = _min; timeObj["seccond"] = _sec; timeObj["milsecond"] = _milsec; return timeObj })

var globalID, vYear, vMonth, vDay, vHour, vMin, vSec, vMil, vStart = false, vFunction, vCallBack = false;
//var vPause = false;
var vH = false;
var vSpeed = 1;
var vCanvas = document.createElement("canvas");
var vCtx = vCanvas.getContext("2d");

var _callback = (function (callBackFunction) { vFunction = callBackFunction; vCallBack = true; });
function renderTime(yyyy, MM, dd, hh, mm, ss, ms, speed) {

    var today = yyyy + " " + MM + " " + dd;
    var time = hh + ":" + mm + ":" + ss;
    var hrs = hh;
    var min = mm;
    var sec = ss;
    var mil = ms;
    var smoothsec = sec + (mil / 1000);
    var smoothmin = min + (smoothsec / 60);
    

    //Background
    gradient = vCtx.createRadialGradient(125, 125, 15, 125, 125, 125);
    gradient.addColorStop(0, _backgroundGradientInnerColor);
    gradient.addColorStop(1, _backgroundGradientOuterColor);
    vCtx.fillStyle = gradient;
    //ctx.fillStyle = 'rgba(00 ,00 , 00, 1)';
    vCtx.fillRect(0, 0, 250, 250);

    //Hours
    vCtx.beginPath();
    var hrs2 = hrs;
    if (hrs == 0) { hrs2 = 12; }
    vCtx.arc(125, 125, 110, degToRad(270), degToRad((hrs2 * 30) - 90));
    //ctx.lineWidth = 10;
    vCtx.stroke();
    //Minutes
    vCtx.beginPath();
    vCtx.arc(125, 125, 90, degToRad(270), degToRad((smoothmin * 6) - 90));
    vCtx.stroke();
    //Seconds
    vCtx.beginPath();
    vCtx.arc(125, 125, 70, degToRad(270), degToRad((smoothsec * 6) - 90));
    vCtx.stroke();
    //Date
    vCtx.font = "24px Helvetica Bold";
    //ctx.fillStyle = 'rgba(00, 255, 255, 1)'
    vCtx.fillStyle = _dateColor;
    vCtx.fillText(today, 80, 120);
    //Time
    vCtx.font = "22px Helvetica Bold";
    //ctx.fillStyle = 'rgba(00, 255, 255, 1)';
    vCtx.fillStyle = _timeColor;
    var sMil = Math.floor(mil);
    //if (speed >= 60) { ctx.fillText(time, 90, 150); }
    //else { ctx.fillText(time + ":" + sMil, 80, 150); }
    vCtx.fillText(time, 90, 150);

    if (_speed != null || _speed != undefined) {
        speed = _speed;
    }

    mil += 1000 / 60 * speed;
    if (mil >= 1000) {
        var _milalpha = Math.floor(mil / 1000);
        var _milbeta = mil % 1000;
        mil = _milbeta; sec += _milalpha;
    }
    if (sec >= 60) { sec = 0; min += 1; }
    if (min >= 60) { min = 0; hrs += 1; }
    if (hrs > 12) { vH = true; }
    if (hrs >= 24) { hrs = 0; dd += 1; vH = false; }
    if (dd > 31) { if (MM == 1 || MM == 3 || MM == 5 || MM == 7 || MM == 8 || MM == 10) { dd = 1; MM += 1; } else if (MM == 12) { dd = 1; MM = 1; yyyy += 1; } }
    if (dd > 30) { if (MM == 4 || MM == 6 || MM == 9 || MM == 11) { dd = 1; MM += 1; } }
    if (dd > 28) { if (MM == 2 && yyyy % 4 != 0) { dd = 1; MM += 1; } }
    if (dd > 29) { if (MM == 2 && yyyy % 4 == 0) { dd = 1; MM += 1; } }


    vYear = yyyy; vMonth = MM; vDay = dd; vHour = hrs; vMin = min; vSec = sec; vMil = mil; vSpeed = speed;
    _year = yyyy; _month = MM; _day = dd; _hour = hrs; _min = min; _sec = sec; _milsec = mil, _speed = speed;


    if (vCallBack == true) {
        vFunction();
    };

    globalID = requestAnimationFrame(function () { renderTime(yyyy, MM, dd, hrs, min, sec, mil, speed) });
    if (vStart == false) {
        cancelAnimationFrame(globalID);
    }
}

function degToRad(degree) {
    var factor = Math.PI / 180;
    return degree * factor;
}

var _start = (function () { vStart = true; renderTime(vYear, vMonth, vDay, vHour, vMin, vSec, vMil, _speed) });
var _pause = (function () { cancelAnimationFrame(globalID); vStart = false; })

var _create = (function (divID) {
    _div = divID;

    if (_circleColor == undefined || _circleColor == "") { _circleColor = 'rgba(225,225,100,1)' };
    if (_circleShadowColor == undefined || _circleShadowColor == "") { _circleShadowColor = '#ECECFF' };
    if (_backgroundGradientInnerColor == undefined || _backgroundGradientInnerColor == "") { _backgroundGradientInnerColor = '#03303a' };
    if (_backgroundGradientOuterColor == undefined || _backgroundGradientOuterColor == "") { _backgroundGradientOuterColor = 'black' };

    if (_dateColor == undefined || _dateColor == "") { _dateColor = 'rgba(128, 255, 255, 1)' };
    if (_timeColor == undefined || _timeColor == "") { _timeColor = 'rgba(128, 255, 255, 1)' };
    if (_year == undefined || _year == "") {
        var time = new Date();
        _year = time.getFullYear();
        _month = time.getMonth() + 1;
        _day = time.getDate();
        _hour = time.getHours();
        _min = time.getMinutes();
        _sec = time.getSeconds();
    };
    if (_speed == undefined || _speed == "") { _speed = 1 };
    if (_marginleft == undefined || _marginleft == "") { _marginleft = 0 };
    if (_margintop == undefined || _margintop == "") { _margintop = 0 };


    vCanvas.id = "canvas_timeline";
    vCanvas.width = 250;
    vCanvas.height = 250;

    if (_div == undefined || _div == "" || _div == null) {
        document.body.appendChild(vCanvas);
    } else {
        document.getElementById(_div).appendChild(vCanvas);
    }

    vCtx.strokeStyle = _circleColor;
    vCtx.lineWidth = 10;
    vCtx.shadowBlur = 15;
    vCtx.shadowColor = _circleShadowColor;

    var canvasTimeline = document.getElementById("canvas_timeline");
    canvasTimeline.style.marginLeft = _marginleft;
    canvasTimeline.style.marginTop = _margintop;
    //canvasTimeline.style.position = "absolute";




    var _mil = new Date().getMilliseconds();
    var animateClock = renderTime(_year, _month, _day, _hour, _min, _sec, _mil, _speed);



    vCanvas.addEventListener('mousemove', function (evt) {
        var mousePos = getMousePos(vCanvas, evt);
        var x = mousePos.x - 125;
        var y = 125 - mousePos.y;
        var result = calculateClock(x, y);
        //console.log("此處是：" + result.value + result.measurement);
        if (result.measurement == "N" && vStart == false) { vCanvas.title = "繼續" } else if (result.measurement == "N" && vStart == true) { vCanvas.title = "暫停" }
        if (result.measurement == "H") { vCanvas.title = "跳至" + result.value + "點" }
        if (result.measurement == "M") { vCanvas.title = "跳至" + result.value + "分" }
        if (result.measurement == "S") { vCanvas.title = "跳至" + result.value + "秒" }

    }, false);

    vCanvas.addEventListener('click', function (evt) {
        var mousePos = getMousePos(vCanvas, evt);
        //console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
        var x = mousePos.x - 125;
        var y = 125 - mousePos.y;
        var r = Math.sqrt(x * x + y * y);
        var result = calculateClock(x, y);
        cancelAnimationFrame(globalID);

        if (result.measurement == "H" && vH == false) {
            cancelAnimationFrame(globalID);
            return renderTime(vYear, vMonth, vDay, result.value, vMin, vSec, vMil, vSpeed);
        } else if (result.measurement == "H" && vH == true) {
            cancelAnimationFrame(globalID);
            return renderTime(vYear, vMonth, vDay, result.value + 12, vMin, vSec, vMil, vSpeed);
        }
        else if (result.measurement == "M") {
            cancelAnimationFrame(globalID);
            return renderTime(vYear, vMonth, vDay, vHour, result.value, vSec, vMil, vSpeed);
        } else if (result.measurement == "S") {
            cancelAnimationFrame(globalID);
            return renderTime(vYear, vMonth, vDay, vHour, vMin, result.value, vMil, vSpeed);
        }
            //else if (vPause == true) { return renderTime(vYear, vMonth, vDay, vHour, vMin, vSec, vMil, vSpeed), vPause = false; }
            //else if (vPause == false) { cancelAnimationFrame(globalID); return vPause = true; }
        else if (vStart == false) { _start(); }
        else if (vStart == true) { _pause(); }

    }, false);

    function getMousePos(vCanvas, evt) {
        var rect = vCanvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    //return theta
    function xyToTheta(x, y) {
        var lxl = Math.abs(x);
        var r = Math.sqrt(x * x + y * y);
        var cos = lxl / r;
        var theta = Math.acos(cos) * (180 / Math.PI);

        if (x > 0 && y > 0) { theta = 90 - theta; }
        else if (x > 0 && y < 0) { theta = theta + 90 }
        else if (x < 0 && y < 0) { theta = 270 - theta }
        else if (x < 0 && y > 0) { theta = 270 + theta }
        else { return }

        return theta;
    }

    //positionToClock
    //圓半徑，200 170 140，筆刷寬度(20)，+-10
    function xyToClock(x, y) {
        var r = Math.sqrt(x * x + y * y);
        var clock = "";
        if (r > 110 - 5 && r < 110 + 5) { clock = "H"; }
        else if (r > 90 - 5 && r < 90 + 5) { clock = "M"; }
        else if (r > 70 - 5 && r < 70 + 5) { clock = "S" }
        else { clock = "N"; }
        return clock;
    }

    function calculateClock(x, y) {
        var theta = xyToTheta(x, y);
        var clock = xyToClock(x, y);
        var result;
        var resultObj = {};

        if (clock == "H") { result = Math.floor(theta / 30); }
        else if (clock == "M" || clock == "S") { result = Math.floor(theta / 6); }
        else { result = null }
        resultObj["value"] = result;
        resultObj["measurement"] = clock;
        return resultObj;
    }
})







