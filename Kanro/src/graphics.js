/*
Hey guys! We have a gift for you.
We just need you to answer a few questions first, then you'll earn a nice reward.
It's very quick and simple!
It only take a minute.
So come on, click on folliwing link to claim your gift.
Don't wait, time is running out.
Click on the link and enjoy your free gift.

Now hurry up!!!
Click on the link and enjoy your free gift.
*/

function makeCanvas(canvas_id) {
    const mainDivElement = document.getElementById(MAIN_DIV_ID);
    const canvasElement = document.createElement('canvas');
    canvasElement.id = canvas_id;
    canvasElement.width = CANVAS_SIZE.width;
    canvasElement.height = CANVAS_SIZE.height;
    mainDivElement.appendChild(canvasElement);

    const canvas = document.getElementById(canvas_id);
    let ctx;
    if(canvas.getContext){
        ctx = canvas.getContext('2d');
    } else {
        ctx = undefined;
    }
    return {canvas: canvas, ctx: ctx};
}

var box = (coord, color, ctx) =>{
    ctx.beginPath();
}