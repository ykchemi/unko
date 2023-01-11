

function makeCanvas(canvas_id){
    const cv = document.createElement('canvas');
    const dv = document.getElementById(MAIN_DIV_ID);
    cv.id = canvas_id;
    cv.width = CANVAS_SIZE.width;
    cv.height = CANVAS_SIZE.height;
    dv.appendChild(cv);

    const cv_ele = document.getElementById(canvas_id);
    let ctx
    if(cv_ele.getContext){
        ctx = cv_ele.getContext('2d');
    } else {
        ctx = undefined;
    }
    return {canvas: cv_ele, ctx: ctx};
}


/*make map*/
function makeMap(){
    let foundation_map_array = [];
    for(let i=0;i<MAP_SIZE.height / BOX_SIZE;i++){
        foundation_map_array.push(Array(MAP_SIZE.width / BOX_SIZE).fill(0));
    }
}

/*モチベ切れたゆえ、あとで作る。 */


/*move character*/

function decodeFromRGB(arr){
    let ReturnArray = [];
    for(let i=0; i<DATA_LENGTH;i++){
        if(isNaN(arr[0][i])){
            ReturnArray[i] = NaN;
        } else {
            var r = arr[0][i].toString(16);
            var g = arr[1][i].toString(16);
            var b = arr[2][i].toString(16);
            ReturnArray[i] = '#' + r + g + b;
        }
    }
    return ReturnArray;
}

function drawChara(ctx, coord){

}