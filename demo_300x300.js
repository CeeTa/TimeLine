function timeline() {
    this.setPosition = _setPosition;
    this.setColor = _setColor;
    this.setTime = _setTime;
    this.setSpeed = _setSpeed;
    this.create = _create;
    this.getTime = _getTime;
    
}

var _circleColor, _circleShadowColor, _backgroundGradientInnerColor, _backgroundGradientOuterColor, _dateColor,_timeColor,_year, _month, _day, _hour, _min, _sec, _speed, _marginleft, _margintop,_div;

var _setPosition = (function (marginleft, margintop) { _marginleft = marginleft; _margintop = margintop; })
var _setColor = (function (circleColor, circleShadowColor, backgroundGradientInnerColor, backgroundGradientOuterColor, dateColor, timeColor) {
    if (circleColor == null || circleColor == "") { _circleColor = 'rgba(225,225,100,180)' } else { _circleColor = circleColor; }
    if (circleShadowColor == null || circleShadowColor == "") { _circleShadowColor = '#ECECFF' } else { _circleShadowColor = circleShadowColor; }
    if (backgroundGradientInnerColor == null || backgroundGradientInnerColor == "") { _backgroundGradientInnerColor = '#03303a' } else { _backgroundGradientInnerColor = backgroundGradientInnerColor; }
    if (backgroundGradientOuterColor == null || backgroundGradientOuterColor == "") { _backgroundGradientOuterColor = 'black' } else { _backgroundGradientOuterColor = backgroundGradientOuterColor; }
    if (dateColor == null || dateColor == "") { _dateColor = 'rgba(128, 255, 255, 120)' } else { _dateColor = dateColor; }
    if (timeColor == null || timeColor == "") { _timeColor = 'rgba(128, 255, 255, 120)' } else { _timeColor = timeColor; }
})

var _setTime = (function (dateString) {
    var time;
    if (new Date(dateString)) {time = new Date(dateString);} else { time = new Date();}
    _year = time.getFullYear();
    _month = time.getMonth()+1;
    _day = time.getDate();
    _hour = time.getHours();
    _min = time.getMinutes();
    _sec = time.getSeconds();
})

var _setSpeed = (function (speed) { _speed = speed })
var _getTime = (function () { var timeObj = {}; timeObj["year"] = _year; timeObj["month"] = _month; timeObj["day"] = _day; timeObj["hour"] = _hour; timeObj["minute"] = _min; timeObj["seccond"] = _sec; return timeObj })
var _create = (function (divID) {
    _div = divID;

    if (_circleColor == undefined || _circleColor == "") { _circleColor = 'rgba(225,225,100,180)' };
    if (_circleShadowColor == undefined) { _circleShadowColor = '#ECECFF' };
    if (_backgroundGradientInnerColor == undefined || _backgroundGradientInnerColor == "") { _backgroundGradientInnerColor = '#03303a' };
    if (_backgroundGradientOuterColor == undefined || _backgroundGradientOuterColor == "") { _backgroundGradientOuterColor = 'black' };

    if (_dateColor == undefined || _dateColor == "") { _dateColor = 'rgba(128, 255, 255, 120)' };
    if (_timeColor == undefined || _timeColor == "") { _timeColor = 'rgba(128, 255, 255, 120)' };
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

    var globalID, vYear, vMonth, vDay, vHour, vMin, vSec, vMil;
    var pause = false;
    var vH = false;
    var vSpeed = 1;
    var canvas = document.createElement("canvas");
    canvas.id = "canvas_timeline";
    canvas.width = 300;
    canvas.height = 300;

    if (_div == undefined || _div == "" || _div == null) {
        document.body.appendChild(canvas);
    }else{
    document.getElementById(_div).appendChild(canvas);      
    }

    var ctx = canvas.getContext("2d");
    ctx.strokeStyle = _circleColor;
    ctx.lineWidth = 17;
    ctx.shadowBlur = 15;
    ctx.shadowColor = _circleShadowColor;

    var canvasTimeline = document.getElementById("canvas_timeline");
    canvasTimeline.style.marginLeft = _marginleft;
    canvasTimeline.style.marginTop = _margintop;
    //canvasTimeline.style.position = "absolute";


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
        gradient = ctx.createRadialGradient(150, 150, 15, 150, 150, 150);
        gradient.addColorStop(0, _backgroundGradientInnerColor);
        gradient.addColorStop(1, _backgroundGradientOuterColor);
        ctx.fillStyle = gradient;
        //ctx.fillStyle = 'rgba(00 ,00 , 00, 1)';
        ctx.fillRect(0, 0, 300, 300);

        //Hours
        ctx.beginPath();
        var hrs2 = hrs;
        if (hrs == 0) { hrs2 = 12; }
        ctx.arc(150, 150, 135, degToRad(270), degToRad((hrs2 * 30) - 90));
        //ctx.lineWidth = 10;
        ctx.stroke();
        //Minutes
        ctx.beginPath();
        ctx.arc(150, 150, 105, degToRad(270), degToRad((smoothmin * 6) - 90));
        ctx.stroke();
        //Seconds
        ctx.beginPath();
        ctx.arc(150, 150, 75, degToRad(270), degToRad((smoothsec * 6) - 90));
        ctx.stroke();
        //Date
        ctx.font = "20px Helvetica";
        //ctx.fillStyle = 'rgba(00, 255, 255, 1)'
        ctx.fillStyle = _dateColor;
        ctx.fillText(today, 95, 140);
        //Time
        ctx.font = "20px Helvetica Bold";
        //ctx.fillStyle = 'rgba(00, 255, 255, 1)';
        ctx.fillStyle = _timeColor;
        var sMil = Math.floor(mil);
        if (speed >= 60) { ctx.fillText(time , 135, 170); }
        else { ctx.fillText(time + ":" + sMil, 100, 170); }
        


        mil += 1000 / 60 * speed;
        if (mil > 999) { mil = 0; sec += 1; }
        if (sec == 60) { sec = 0; min += 1; }
        if (min == 60) { min = 0; hrs += 1; }
        if (hrs > 12) { vH = true; }
        if (hrs == 24) { hrs = 0; dd += 1; vH = false; }
        if (dd > 31) { if (MM == 1 || MM == 3 || MM == 5 || MM == 7 || MM == 8 || MM == 10) { dd = 1; MM += 1; } else if (MM == 12) { dd = 1; MM = 1; yyyy += 1; } }
        if (dd > 30) { if (MM == 4 || MM == 6 || MM == 9 || MM == 11) { dd = 1; MM += 1; } }
        if (dd > 28) { if (MM == 2 && yyyy % 4 != 0) { dd = 1; MM += 1; } }
        if (dd > 29) { if (MM == 2 && yyyy % 4 == 0) { dd = 1; MM += 1; } }


        vYear = yyyy; vMonth = MM; vDay = dd; vHour = hrs; vMin = min; vSec = sec; vMil = mil; vSpeed = speed;
        _year = yyyy; _month = MM; _day = dd; _hour = hrs; _min = min; _sec = sec;
        globalID = requestAnimationFrame(function () { renderTime(yyyy, MM, dd, hrs, min, sec, mil, speed) });
    }

    var _mil = new Date().getMilliseconds();
    var animateClock = renderTime(_year, _month, _day, _hour, _min, _sec, _mil, _speed);

    function degToRad(degree) {
        var factor = Math.PI / 180;
        return degree * factor;
    }

    canvas.addEventListener('mousemove', function (evt) {
        var mousePos = getMousePos(canvas, evt);
        var x = mousePos.x - 150;
        var y = 150 - mousePos.y;
        var result = calculateClock(x, y);
        //console.log("此處是：" + result.value + result.measurement);
        if (result.measurement == "N" && pause == true) { canvas.title = "繼續" } else if (result.measurement == "N" && pause == false) { canvas.title = "暫停" }
        if (result.measurement == "H") { canvas.title = "跳至" + result.value + "點" }
        if (result.measurement == "M") { canvas.title = "跳至" + result.value + "分" }
        if (result.measurement == "S") { canvas.title = "跳至" + result.value + "秒" }

    }, false);

    canvas.addEventListener('click', function (evt) {
        var mousePos = getMousePos(canvas, evt);
        //console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
        var x = mousePos.x - 150;
        var y = 150 - mousePos.y;
        var r = Math.sqrt(x * x + y * y);
        var result = calculateClock(x, y);
        cancelAnimationFrame(globalID);

        if (result.measurement == "H" && vH == false) {
            cancelAnimationFrame(globalID);
            return renderTime(vYear, vMonth, vDay, result.value, vMin, vSec, vMil,vSpeed);
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
        else if (pause == true) { return renderTime(vYear, vMonth, vDay, vHour, vMin, vSec, vMil, vSpeed), pause = false; }
        else if (pause == false) { cancelAnimationFrame(globalID); return pause = true; }

    }, false);

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
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
        if (r > 135 - 10 && r < 135 + 10) { clock = "H"; }
        else if (r > 105 - 10 && r < 105 + 10) { clock = "M"; }
        else if (r > 75 - 10 && r < 75 + 10) { clock = "S" }
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







