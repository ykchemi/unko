document.body.style.overflow = 'hidden';
const cv = makeCanvas(MAIN_CANVAS_ID);
const stop_c = makeCharacterFromCSV(STOPPING_MR_DEBUG_R, STOPPING_MR_DEBUG_G, STOPPING_MR_DEBUG_B);
chara_coord = [0, 0]
drawCharacter(stop_c, FIRST_COORD ,cv.ctx);
getDirection(cv.canvas, cv.ctx);