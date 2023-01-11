
//call at first

function drawHeadAtZeroPosition(ctx){
    ctx.fillStyle = KUROKO_COLOR;
    ctx.arc(KUROKO_HEAD_RADIUS, KUROKO_HEAD_RADIUS, KUROKO_HEAD_RADIUS, 0, Math.PI * 2);
    ctx.fill();
}

function drawBodyAtZeroPosition(ctx){
    ctx.moveTo(KUROKO_HEAD_RADIUS, KUROKO_HEAD_RADIUS*2);
    ctx.lineTo(KUROKO_HEAD_RADIUS, KUROKO_HEAD_RADIUS*2+KUROKO_BODY_LENGTH);
    ctx.stroke();
}