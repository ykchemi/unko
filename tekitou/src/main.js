
const CONFIG = {
    MAIN_DIV_ID: 'mn_dv',

    CANVAS_WIDTH: 700,
    CANVAS_HEIGHT: 700,
    CANVAS_ID: 'cv',

    USER_IMAGE_PATH: 'src/USER.png',
    USER_IMAGE_SIZE: [50, 50],

    ENEMY_MOVING_WIDTH_VALUE: 20,

    OKO_ENEMY_PATH: 'src/ENEMY.png',
    OKO_ENEMY_FREQ: 0.8,
    OKO_ENEMY_BULLET: 10,
    OKO_ENEMY_INTERVAL: 1000, //ms
    OKO_ENEMY_RANGE: 20, //degree

    FRAME_SEC: 5 //ms
};

function EnemyConstructor(path, frequency_of_appearrance, value_of_bullet, interval_of_fire, range_of_barrage){
    //frequency of appearance ... 0<...<=1  at every frame, range_of_barrage
    this.path = path;
    this.frequencyOfAppearance = frequency_of_appearrance;
    this.valueOfBullet = value_of_bullet;
    this.intervalOfFire = interval_of_fire;
    this.rangeOfBarrage = range_of_barrage;

}

const ENEMY_LIST = {
    OKO_ENEMY: new EnemyConstructor(
        CONFIG.OKO_ENEMY_PATH,
        CONFIG.OKO_ENEMY_FREQ,
        CONFIG.OKO_ENEMY_BULLET,
        CONFIG.OKO_ENEMY_INTERVAL,
        CONFIG.OKO_ENEMY_RANGE
    )

};



function getCursorPosition(){
    return new Promise((resolve, reject) => {
        document.getElementById(CONFIG.CANVAS_ID).addEventListener('mousemove', function(e){
            const x = e.offsetX;
            const y = e.offsetY;
            resolve([x, y]);
        });
    });
}


function drawPlayer(ctx, position){
    const img = new Image();
    img.src = CONFIG.USER_IMAGE_PATH;
    ctx.drawImage(img, ...position);
}

function appearEnemy(ctx, position){
    //The title of this function is 'appear Enemy' but Enemy is subject.
}

let positionOfEnemy = {};

function PositionOfEnemy(position, type){
    this.position = position;
    this.type = type;
}

function moveEnemy(ctx){

}

function callEnemy(ctx){
    const img = new Image();
    img.src = ENEMY_LIST.OKO_ENEMY.path;
    positionOfEnemy['test_enemy'] = new PositionOfEnemy([350, 0], ENEMY_LIST.OKO_ENEMY);
}

function drawEnemy(ctx){
    console.log(positionOfEnemy);
    const pos = positionOfEnemy['test_enemy'].position;
    ctx.drawImage(ENEMY_LIST.OKO_ENEMY.path, ...pos);
    positionOfEnemy['test_enemy'].position = [pos[0] + CONFIG.ENEMY_MOVING_WIDTH_VALUE, pos[1]];
}

let mn_dv = document.createElement('div');
mn_dv.id = CONFIG.MAIN_DIV_ID;
document.body.appendChild(mn_dv);

mn_dv = document.getElementById(CONFIG.MAIN_DIV_ID);

let cv = document.createElement('canvas');
cv.id= CONFIG.CANVAS_ID;
cv.width = CONFIG.CANVAS_WIDTH;
cv.height = CONFIG.CANVAS_HEIGHT;
cv.style.cursor = 'none';
mn_dv.appendChild(cv);

cv = document.getElementById(CONFIG.CANVAS_ID);
let ctx = cv.getContext('2d');

if(! cv.getContext){
    ctx = undefined;
}

let bf_position = [0, 0];
let start_time = Date.now();
let last_time = Date.now();

function main(){
    last_time = Date.now()
    if(last_time - start_time >= CONFIG.FRAME_SEC){
        start_time = Date.now()
        getCursorPosition()
        .then((position) => {
            ctx.clearRect(...bf_position, CONFIG.CANVAS_WIDTH, CONFIG.CANVAS_HEIGHT);
            drawPlayer(ctx, position);
            drawEnemy(ctx);
            bf_position = position;
        })
    }
    window.requestAnimationFrame(main);
}
callEnemy(ctx);
main();