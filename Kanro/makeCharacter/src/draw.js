/*
    If you need to contact us, please using private message on Twitter.

    ---LECENSE---

    Copyright (c) 2022 Kagakubukinsei (Twitter: @Kagakubukinsei)

   This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

/*
...This file name is "draw.js"...
But, this file includes functiones to draw and "record"...
So, It's main file of src...
*/

/*to draw variavle*/
let n = true;


/*record zone from here */

let recordR = [];
let recordG = [];
let recordB = [];

/*data terms
recordArray = [[...(CANVAS_SIZE.width)]...(CANVAS_SIZE.height)]
*/

function makeArrayToRecord(){
    recordR = Array(NUM_OF_GRID_LINE);
    recordG = Array(NUM_OF_GRID_LINE);
    recordB = Array(NUM_OF_GRID_LINE);
    for(let i=0;i<NUM_OF_GRID_LINE;i++){
        recordR[i] = Array(NUM_OF_GRID_LINE).fill(NaN);
        recordG[i] = Array(NUM_OF_GRID_LINE).fill(NaN);
        recordB[i] = Array(NUM_OF_GRID_LINE).fill(NaN);
    }
}

function recordFootmark(coord, color){
    if(typeof(color) != 'number'){
        if(COLOR_KEYWORD_AND_16_CODE.includes(color) & color.includes('#') == false){
            if(color.includes('#') & color.length != 7){
                window.alert('You are drawing with undefined color code or keyword. Please reading "Manual", and try to set color again.');
                color = DEFAULT_FILL_COLOR;
                n=true;
            }
            color = COLOR_KEYWORD_AND_16_CODE[COLOR_KEYWORD_AND_16_CODE.indexOf(color) + 1];
        } else if(COLOR_KEYWORD_AND_16_CODE.includes(color)==false & color.includes('#') == false){
            window.alert('You are drawing with undefined color code or keyword. Please reading "Manual", and try to set color again.');
            color = DEFAULT_FILL_COLOR;
            n=true;
        }
    }
    if(typeof(color) == 'number'){
        recordR[coord.height][coord.width] = NaN;
        recordG[coord.height][coord.width] = NaN;
        recordB[coord.height][coord.width] = NaN;
        //console.log('nyan!');
    } else {
        recordR[coord.height][coord.width] = parseInt(color.slice(1, 3), 16);
        recordG[coord.height][coord.width] = parseInt(color.slice(3, 5), 16);
        recordB[coord.height][coord.width] = parseInt(color.slice(5, 7), 16);
    }
    /*console.log(recordR);*/
}

function exportData(){
    /*console.log('---start Exporting---')*/
    var str = '';
    for(let i=0;i<recordR.length;i++){
        str = str + recordR[i].join(',') + '\n';
    }
    const ArrR = new Blob([str], {type:'text/csv'});

    var str = '';
    for(let i=0;i<recordG.length;i++){
        str = str + recordG[i].join(',') + '\n';
    }
    const ArrG = new Blob([str], {type:'text/csv'});

    var str = '';
    for(let i=0;i<recordB.length;i++){
        str = str + recordB[i].join(',') + '\n';
    }
    const ArrB = new Blob([str], {type:'text/csv'});

    if(document.getElementById(EXPORT_R_ID) != null){
        document.getElementById(EXPORT_R_ID).remove();
        document.getElementById(EXPORT_G_ID).remove();
        document.getElementById(EXPORT_B_ID).remove();
        for(let i=0;i<3;i++){
            document.getElementById('br_').remove();
        }
    }

    const divElement = document.getElementById(DOWNLOAD_DIV_ID);

    const exportRecordRElement = document.createElement('a');
    const text_R = document.createTextNode('File of R');
    exportRecordRElement.id = EXPORT_R_ID;
    exportRecordRElement.href = URL.createObjectURL(ArrR);
    exportRecordRElement.download = 'CanvasDataR.csv';
    exportRecordRElement.appendChild(text_R);
    divElement.appendChild(exportRecordRElement);
    var br = document.createElement('br');
    br.id = 'br_';
    divElement.appendChild(br);

    const exportRecordGElement = document.createElement('a');
    const text_G = document.createTextNode('File of G');
    exportRecordGElement.id = EXPORT_G_ID;
    exportRecordGElement.href = URL.createObjectURL(ArrG);
    exportRecordGElement.download = 'CanvasDataG.csv';
    exportRecordGElement.appendChild(text_G);
    divElement.appendChild(exportRecordGElement);
    var br = document.createElement('br');
    br.id = 'br_';
    divElement.appendChild(br);

    const exportRecordBElement = document.createElement('a');
    const text_B = document.createTextNode('File of B');
    exportRecordBElement.id = EXPORT_B_ID;
    exportRecordBElement.href = URL.createObjectURL(ArrB);
    exportRecordBElement.download = 'CanvasDataB.csv';
    exportRecordBElement.appendChild(text_B);
    divElement.appendChild(exportRecordBElement);
    var br = document.createElement('br');
    br.id = 'br_';
    divElement.appendChild(br);

    URL.revokeObjectURL(ArrR);
    URL.revokeObjectURL(ArrB);
    URL.revokeObjectURL(ArrG);
}


/*canvas zone from here*/
let color_ = '';


function makeCanvas(id){
    const canvasElement = document.createElement('canvas');
    const divElement = document.getElementById(MAIN_DIV_ID);
    canvasElement.id = id;
    canvasElement.width = CANVAS_SIZE.width;
    canvasElement.height = CANVAS_SIZE.height;
    divElement.appendChild(canvasElement);

    const canvas = document.getElementById(id)
    if(canvas.getContext){
        ctx = canvas.getContext('2d');
    } else {
        ctx = undefined;
    }
    ctx.fillStyle = DEFAULT_FILL_COLOR;
    color_ = DEFAULT_FILL_COLOR;
    return {canvas: canvas, ctx: ctx};
}

function setGrid(ctx){
    const gridIntervalOnXAxis = Math.ceil(CANVAS_SIZE.width / NUM_OF_GRID_LINE);
    const gridIntervalOnYAxis = Math.ceil(CANVAS_SIZE.height / NUM_OF_GRID_LINE);
    let begin_coord;
    let end_coord;

    const drawLine = (ctx, begin_coord, end_coord) => {
        ctx.beginPath();
        ctx.moveTo(...begin_coord);
        ctx.lineTo(...end_coord);
        ctx.lineWidth = GRID_LINE_WIDTH;
        ctx.strokeStyle = GRID_LINE_COLOR;
        ctx.stroke();
    }

    for(let i=0;i * gridIntervalOnXAxis<CANVAS_SIZE.height;i++){
        begin_coord = [0, i * gridIntervalOnXAxis];
        end_coord = [CANVAS_SIZE.width, i * gridIntervalOnXAxis];
        drawLine(ctx, begin_coord, end_coord);
    }
    for(let i=0;i * gridIntervalOnYAxis<CANVAS_SIZE.width;i++){
        begin_coord = [i * gridIntervalOnYAxis, 0];
        end_coord = [i * gridIntervalOnYAxis, CANVAS_SIZE.height];
        drawLine(ctx, begin_coord, end_coord)
    }
}

function Events(canvas, ctx){
    const gridIntervalOnXAxis = CANVAS_SIZE.width / NUM_OF_GRID_LINE;
    const gridIntervalOnYAxis = CANVAS_SIZE.height / NUM_OF_GRID_LINE;
    canvas.addEventListener('click', (e)=>{
        if(n){
            var x = e.offsetX;
            var y = e.offsetY;
            square_coord = [
                (Math.trunc(x / gridIntervalOnXAxis) * gridIntervalOnXAxis),
                (Math.trunc(y / gridIntervalOnYAxis) * gridIntervalOnYAxis)
            ];
            /*console.log(square_coord);*/
            ctx.fillRect(
                ...square_coord, 
                CANVAS_SIZE.width / NUM_OF_GRID_LINE, 
                CANVAS_SIZE.height / NUM_OF_GRID_LINE
            );
            /*console.log(Math.trunc(x / gridIntervalOnXAxis), Math.trunc(y / gridIntervalOnYAxis));*/
            recordFootmark({width:  Math.trunc(x / gridIntervalOnXAxis), height: Math.trunc(y / gridIntervalOnYAxis) }, color_);
            n=false;
        } else {
            n=true;
        }
    })
    canvas.addEventListener('mousemove', (e)=>{
        if(n){}else{
            var x = e.offsetX;
            var y = e.offsetY;
            square_coord = [
                (Math.trunc(x / gridIntervalOnXAxis) * gridIntervalOnXAxis),
                (Math.trunc(y / gridIntervalOnYAxis) * gridIntervalOnYAxis)
            ];
            /*console.log(square_coord);*/
            ctx.fillRect(
                ...square_coord, 
                CANVAS_SIZE.width / NUM_OF_GRID_LINE, 
                CANVAS_SIZE.height / NUM_OF_GRID_LINE
            );
            /*console.log(Math.trunc(x / gridIntervalOnXAxis), Math.trunc(y / gridIntervalOnYAxis) );*/
            recordFootmark({width: Math.trunc(x / gridIntervalOnXAxis), height: Math.trunc(y / gridIntervalOnYAxis) }, color_);
        }
    })
}

function changeColor(ctx){
    const color = document.getElementById(INPUT_FORM_ID).value;
    /*console.log(color);*/
    if(color == 'nan'){
        ctx.fillStyle = 'white';
        color_ = NaN;
    } else {
        ctx.fillStyle = color;
        color_ = color;
    }
    console.log(color_);
}