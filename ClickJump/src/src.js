
function makeCanvas(canvas_id = MAIN_CANVAS_ID, div_id = MAIN_DIV_ID){
    let canvas = document.createElement('canvas');
    canvas.width = CANVAS_WIDTH_VALUE;
    canvas.height = CANVAS_HEIGHT_VALUE;
    canvas.id = MAIN_CANVAS_ID;

    const div = document.getElementById(div_id);
    div.appendChild(canvas);
}

function makeDefaultGround(canvas_id=MAIN_CANVAS_ID, canGetContext=true){
    const ctx = document.getElementById(canvas_id).getContext('2d');

    if(!canGetContext){
        return false;
    }

    ctx.fillStyle = GROUND_COLOR;

    const groundbox = (x, y) =>{
        ctx.fillRect(x, y, GROUND_BOX_SIZE, GROUND_BOX_SIZE);
    }
    
    for(let i=0; i<CANVAS_WIDTH_VALUE / GROUND_BOX_SIZE;i++){
        var coord = [GROUND_BOX_SIZE * i, CANVAS_HEIGHT_VALUE - GROUND_BOX_SIZE];
        groundbox(...coord);
    }
}