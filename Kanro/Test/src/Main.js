function makeCanvas(id){
    const canvasElement = document.createElement('canvas');
    const divElement = document.getElementById(MAIN_DIV_ID);
    canvasElement.id = id;
    canvasElement.width = CANVAS_SIZE.width;
    canvasElement.height = CANVAS_SIZE.height;
    divElement.appendChild(canvasElement);

    const canvas = document.getElementById(id);
    if(canvas.getContext){
        ctx = canvas.getContext('2d');
    } else {
        ctx = undefined;
    }
    ctx.fillStyle = DEFAULT_FILL_COLOR;
    color_ = DEFAULT_FILL_COLOR;
    return {canvas: canvas, ctx: ctx};
}


/*charactor*/

function makeCharacterFromCSV(r_arr, g_arr, b_arr){
    let ReturnArr = [];
    convertOneLengthToTwoLength = (s) =>{
        if(s.length < 2){
            s = '0' + s;
        }
        return s;
    }
    for(let i=0;i<r_arr.length;i++){
        if(!(isNaN(r_arr[i]))){
            const r = convertOneLengthToTwoLength(r_arr[i].toString(16));
            const g = convertOneLengthToTwoLength(g_arr[i].toString(16));
            const b = convertOneLengthToTwoLength(b_arr[i].toString(16));
            const code = '#' + r + g + b;
            const coord = [(i + 1) % DOT_SIZE, Math.trunc((i + 1) / DOT_SIZE)];
            ReturnArr.push([coord, code]);
        }
    }
    return ReturnArr;
}

function drawCharacter(Arr, starting_point, ctx){
    //starting_point = [width, height]
    drawBox = (coord) => {
        //coord = [width, height]
        ctx.fillRect(...coord, PIXEL_SIZE, PIXEL_SIZE);
    }
    for(let i=0;i<Arr.length;i++){
        ctx.fillStyle = Arr[i][1];
        drawBox([starting_point[0] + (PIXEL_SIZE * Arr[i][0][0]), starting_point[1] + (PIXEL_SIZE * Arr[i][0][1])]);
    }
}

function antiDrawCharacter(Arr, starting_point, ctx){
    //starting_point = [width, height]
    const drawBox = (coord) => {
        //coord = [width, height]
        ctx.clearRect(...coord, PIXEL_SIZE, PIXEL_SIZE);
    }
    for(let i=0;i<Arr.length;i++){
        ctx.fillStyle = Arr[i][1];
        drawBox([starting_point[0] + (PIXEL_SIZE * Arr[i][0][0]), starting_point[1] + (PIXEL_SIZE * Arr[i][0][1])]);
    }
}

let break_value = false;

function moveCharacterToRight(coord, ctx){
    const stop_c = makeCharacterFromCSV(STOPPING_MR_DEBUG_R, STOPPING_MR_DEBUG_G, STOPPING_MR_DEBUG_B);
    const walk_c1 = makeCharacterFromCSV(WARKING_MR_DEBUG_1_R, WARKING_MR_DEBUG_1_G, WARKING_MR_DEBUG_1_B);
    const walk_c2 = makeCharacterFromCSV(WARKING_MR_DEBUG_2_R, WARKING_MR_DEBUG_2_G, WARKING_MR_DEBUG_2_B);
    const intermediate_coord = [coord[0] + Math.trunc((WALKING_PIXEL_VALUE * PIXEL_SIZE) / 2), coord[1]];
    const last_coord = [coord[0] + WALKING_PIXEL_VALUE * PIXEL_SIZE, coord[1]]
    new Promise((resolve, reject) => {
        antiDrawCharacter(stop_c, coord, ctx)
        drawCharacter(walk_c1, coord, ctx);
        window.setTimeout(()=>{
            antiDrawCharacter(walk_c1, coord, ctx);
            resolve();
        }, WAIT_TIME_VALUE)
    }).then(()=>{
        return new Promise((resolve, reject)=>{
            drawCharacter(stop_c, intermediate_coord, ctx);
            window.setTimeout(()=>{
                antiDrawCharacter(stop_c, intermediate_coord, ctx);
                resolve();
            }, WAIT_TIME_VALUE)
        })
    })
    .then(()=>{
        return new Promise((resolve, reject)=>{
            drawCharacter(walk_c2, last_coord, ctx);
            window.setTimeout(()=>{
                antiDrawCharacter(walk_c2, last_coord, ctx);
                resolve();
            }, WAIT_TIME_VALUE)
        })
    })
    .then(()=>{
        drawCharacter(stop_c, last_coord, ctx);
    })
    return last_coord;
}

function moveCharacterToLeft(coord, ctx){
    const stop_c = makeCharacterFromCSV(STOPPING_MR_DEBUG_R, STOPPING_MR_DEBUG_G, STOPPING_MR_DEBUG_B);
    const walk_c1 = makeCharacterFromCSV(WARKING_MR_DEBUG_1_R, WARKING_MR_DEBUG_1_G, WARKING_MR_DEBUG_1_B);
    const walk_c2 = makeCharacterFromCSV(WARKING_MR_DEBUG_2_R, WARKING_MR_DEBUG_2_G, WARKING_MR_DEBUG_2_B);
    const intermediate_coord = [coord[0] - Math.trunc((WALKING_PIXEL_VALUE * PIXEL_SIZE) / 2), coord[1]];
    const last_coord = [coord[0] - WALKING_PIXEL_VALUE * PIXEL_SIZE, coord[1]];
    new Promise((resolve, reject) => {
        antiDrawCharacter(stop_c, coord, ctx)
        drawCharacter(walk_c1, coord, ctx);
        window.setTimeout(()=>{
            antiDrawCharacter(walk_c1, coord, ctx);
            resolve();
        }, WAIT_TIME_VALUE)
    }).then(()=>{
        return new Promise((resolve, reject)=>{
            drawCharacter(stop_c, intermediate_coord, ctx);
            window.setTimeout(()=>{
                antiDrawCharacter(stop_c, intermediate_coord, ctx);
                resolve();
            }, WAIT_TIME_VALUE)
        })
    })
    .then(()=>{
        return new Promise((resolve, reject)=>{
            drawCharacter(walk_c2, last_coord, ctx);
            window.setTimeout(()=>{
                antiDrawCharacter(walk_c2, last_coord, ctx);
                resolve();
            }, WAIT_TIME_VALUE)
        })
    })
    .then(()=>{
        drawCharacter(stop_c, last_coord, ctx);
    })
    break_value = false;
    return last_coord;
}

function moveCharacterToUp(coord, ctx){
    const stop_c = makeCharacterFromCSV(STOPPING_MR_DEBUG_R, STOPPING_MR_DEBUG_G, STOPPING_MR_DEBUG_B);
    const walk_c1 = makeCharacterFromCSV(WARKING_MR_DEBUG_1_R, WARKING_MR_DEBUG_1_G, WARKING_MR_DEBUG_1_B);
    const walk_c2 = makeCharacterFromCSV(WARKING_MR_DEBUG_2_R, WARKING_MR_DEBUG_2_G, WARKING_MR_DEBUG_2_B);
    const intermediate_coord = [coord[0], coord[1] - Math.trunc((WALKING_PIXEL_VALUE * PIXEL_SIZE) / 2)];
    const last_coord = [coord[0], coord[1] - WALKING_PIXEL_VALUE * PIXEL_SIZE];
    new Promise((resolve, reject) => {
        antiDrawCharacter(stop_c, coord, ctx)
        drawCharacter(walk_c1, coord, ctx);
        window.setTimeout(()=>{
            antiDrawCharacter(walk_c1, coord, ctx);
            resolve();
        }, WAIT_TIME_VALUE)
    }).then(()=>{
        return new Promise((resolve, reject)=>{
            drawCharacter(stop_c, intermediate_coord, ctx);
            window.setTimeout(()=>{
                antiDrawCharacter(stop_c, intermediate_coord, ctx);
                resolve();
            }, WAIT_TIME_VALUE)
        })
    })
    .then(()=>{
        return new Promise((resolve, reject)=>{
            drawCharacter(walk_c2, last_coord, ctx);
            window.setTimeout(()=>{
                antiDrawCharacter(walk_c2, last_coord, ctx);
                resolve();
            }, WAIT_TIME_VALUE)
        })
    })
    .then(()=>{
        drawCharacter(stop_c, last_coord, ctx);
    })
    break_value = false;
    return last_coord;
}

function moveCharacterToDown(coord, ctx){
    const stop_c = makeCharacterFromCSV(STOPPING_MR_DEBUG_R, STOPPING_MR_DEBUG_G, STOPPING_MR_DEBUG_B);
    const walk_c1 = makeCharacterFromCSV(WARKING_MR_DEBUG_1_R, WARKING_MR_DEBUG_1_G, WARKING_MR_DEBUG_1_B);
    const walk_c2 = makeCharacterFromCSV(WARKING_MR_DEBUG_2_R, WARKING_MR_DEBUG_2_G, WARKING_MR_DEBUG_2_B);
    const intermediate_coord = [coord[0], coord[1] + Math.trunc((WALKING_PIXEL_VALUE * PIXEL_SIZE) / 2)];
    const last_coord = [coord[0], coord[1] + WALKING_PIXEL_VALUE * PIXEL_SIZE];
    new Promise((resolve, reject) => {
        antiDrawCharacter(stop_c, coord, ctx)
        drawCharacter(walk_c1, coord, ctx);
        window.setTimeout(()=>{
            antiDrawCharacter(walk_c1, coord, ctx);
            resolve();
        }, WAIT_TIME_VALUE)
    }).then(()=>{
        return new Promise((resolve, reject)=>{
            drawCharacter(stop_c, intermediate_coord, ctx);
            window.setTimeout(()=>{
                antiDrawCharacter(stop_c, intermediate_coord, ctx);
                resolve();
            }, WAIT_TIME_VALUE)
        })
    })
    .then(()=>{
        return new Promise((resolve, reject)=>{
            drawCharacter(walk_c2, last_coord, ctx);
            window.setTimeout(()=>{
                antiDrawCharacter(walk_c2, last_coord, ctx);
                resolve();
            }, WAIT_TIME_VALUE)
        })
    })
    .then(()=>{
        drawCharacter(stop_c, last_coord, ctx);
    })
    break_value = false;
    return last_coord;
}

function getDirection(canvas,ctx){
    let chara_coord = FIRST_COORD;
    document.addEventListener('keydown', (e)=>{
        switch(e.key){
            case 'ArrowDown' || 'Down':
                chara_coord = moveCharacterToDown(chara_coord, ctx);
                break;

            case 'ArrowLeft' || 'Left':
                chara_coord = moveCharacterToLeft(chara_coord, ctx);
                break;

            case 'ArrowRight' || 'Right':
                chara_coord = moveCharacterToRight(chara_coord, ctx);
                break;
            case 'ArrowUp' || 'Up':
                chara_coord = moveCharacterToUp(chara_coord, ctx);
                break;

            case ' ' || 'Spacebar':
                break;

            default:
                break;
        }
    })
}
