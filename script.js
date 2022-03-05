var blueColor = "#0F3294";
var blackColor = "#000000";

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function drawLine(ctx, beginX, beginY, endX, endY, stroke = 'black', width = 1) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
    }

    ctx.beginPath();
    ctx.moveTo(beginX, beginY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}

function drawTriangle(context, upper, lowerLeft, lowerRight, color)
{

    context.beginPath();
    context.moveTo(upper.x, upper.y);
    context.lineTo(lowerLeft.x, lowerLeft.y);
    context.lineTo(lowerRight.x, lowerRight.y);
    context.closePath();

    context.fillStyle = color;
    context.fill();
}

function calculateLength(point1, point2)
{
    return Math.sqrt((point1.x - point2.x) * (point1.x - point2.x) + (point1.y - point2.y) * (point1.y - point2.y));
}

function findMidpointCoordinates(point1, point2)
{
    let midpoint = {
        x: (point1.x + point2.x) / 2,
        y: (point1.y + point2.y) / 2
    };

    return midpoint;
}

function serpinski(context, upper, lowerLeft, lowerRight)
{
    let length = calculateLength(upper, lowerLeft);    
    if(length > 2)
    {
        let whiteTriangleUpperLeft = findMidpointCoordinates(upper, lowerLeft);
        let whiteTriangleUpperRight = findMidpointCoordinates(upper, lowerRight);
        let whiteTriangleLower = findMidpointCoordinates(lowerLeft, lowerRight);

        drawTriangle(context, whiteTriangleUpperLeft, whiteTriangleUpperRight, whiteTriangleLower, blackColor);

        serpinski(context, upper, whiteTriangleUpperLeft, whiteTriangleUpperRight);
        serpinski(context, whiteTriangleUpperLeft, lowerLeft, whiteTriangleLower);
        serpinski(context, whiteTriangleUpperRight, whiteTriangleLower, lowerRight);
    }
}

function main()
{
    var height = 1000.0;
    var width = 2000.0;
    var canvas = document.getElementById("myCanvas");

    var ctx = canvas.getContext("2d");

    with(Math)
    {
        let a = 1000.0;
        let h = a * sqrt(3) / 2;
        let dx = 300;

        let startUpper = {x: width / 2, y: 10};
        let startLowerLeft = {x: startUpper.x - a / 2, y: startUpper.y + h};
        let startLowerRight = {x: startUpper.x + a / 2, y: startUpper.y + h};

        drawTriangle(ctx, startUpper, startLowerLeft, startLowerRight, blueColor);

        serpinski(ctx, startUpper, startLowerLeft, startLowerRight);
    }
}
