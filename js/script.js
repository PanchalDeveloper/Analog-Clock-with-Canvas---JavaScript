window.addEventListener('DOMContentLoaded', initialize);


function initialize() {
  setInterval(updateClock, 1000);

  function updateClock() {
    let canvas = document.getElementById("clock");
    let ctx = canvas.getContext("2d");

    let x = canvas.height / 2,
      y = canvas.width / 2,
      gap = 0.8,
      pi = Math.PI,
      sin = Math.sin,
      cos = Math.cos;

    let clockRadius = (x + y) / 2;

    ctx.beginPath();
    ctx.arc(x, y, clockRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#000000";
    ctx.fill();
    // ctx.strokeStyle = "#000000";
    // ctx.stroke();


    ctx.font = clockRadius / 10 + "px cursive";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Draw small lines between numbers 
    for (let j = 1; j <= 60; j++) {
      ctx.moveTo(clockRadius + clockRadius * sin((j * (2 * pi)) / 60), clockRadius - clockRadius * cos((j * (2 * pi)) / 60));

      ctx.lineTo(clockRadius + clockRadius * 0.92 * sin((j * (2 * pi)) / 60), clockRadius - clockRadius * 0.92 * cos((j * (2 * pi)) / 60));
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 5.5;
      ctx.stroke();
    }

    // Draw Numbers for hours
    for (let i = 1; i <= 12; i++) {
      ctx.fillText(
        i,
        clockRadius + clockRadius * gap * sin((i * (2 * pi)) / 12),
        clockRadius - clockRadius * gap * cos((i * (2 * pi)) / 12)
      );
    }


    // Draw Hands for Clock
    function drawClockHand(
      ctx,
      originPoint = 0,
      angle = 0,
      lineClr = "white",
      lineWidth = 1,
      gapPerc = 0
    ) {
      ctx.moveTo(originPoint, originPoint);
      ctx.lineTo(
        originPoint + originPoint * gapPerc * sin(angle),
        originPoint - originPoint * gapPerc * cos(angle)
      );
      ctx.strokeStyle = lineClr;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }

    // Center Big Dot
    let dotSize = 5;

    ctx.beginPath();
    ctx.arc(clockRadius, clockRadius, dotSize, 0, 2 * pi);
    ctx.strokeStyle = "White";
    ctx.fill();

    // Time for clock
    let dt = new Date(),
      hours = dt.getHours(),
      minutes = dt.getMinutes(),
      seconds = dt.getSeconds();

    let fullHours = (hours % 12) + minutes / 60 + seconds / 3600;

    // Clock Hand Angels
    let hoursAngle = fullHours * ((2 * pi) / 12),
      minutesAngle = minutes * ((2 * pi) / 60),
      secondsAngle = seconds * ((2 * pi) / 60);

    // Hours Hand
    drawClockHand(ctx, clockRadius, hoursAngle, "white", 3.5, 0.625);

    // Minutes Hand
    drawClockHand(ctx, clockRadius, minutesAngle, "white", 2, 0.725);

    // Seconds Hand
    drawClockHand(ctx, clockRadius, secondsAngle, "white", 2, 0.825);
  }

}