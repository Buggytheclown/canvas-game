export class Animate {
    context;
    sprite;
    onImgStep = 0;
    tickPerFrame;
    currentTick = 0;
    lastDirection = 'RIGHT';
    onSpritePosition;


    constructor({context, spritePromise, onSpriteType}) {
        // Invariant check
        // ['xywh_move_DOWN', 'xywh_move_UP', 'xywh_move_RIGHT',
        //     'xywh_move_LEFT', 'xywh_DOWN', 'xywh_UP',
        //     'xywh_RIGHT', 'xywh_LEFT'].forEach(el => {
        //     if (onSpritePosition[el] === undefined) {
        //         throw new TypeError(`Animate expect '${el}' parameter will be defined!`);
        //     }
        // });
        var greenTankOnSprite = {
            xywh_move_DOWN: [676, 34, 24, 30],
            xywh_move_UP: [676, 1, 24, 30],
            xywh_move_RIGHT: [482, 260, 30, 24],
            xywh_move_LEFT: [513, 260, 30, 24],
            xywh_DOWN: [452, 162, 24, 29],
            xywh_UP: [452, 1, 24, 29],
            xywh_RIGHT: [610, 100, 29, 24],
            xywh_LEFT: [545, 68, 29, 24]
        };
        var blueTankOnSprite = {
                xywh_move_DOWN: [676, 322, 24, 30],
                xywh_move_UP: [676, 289, 24, 30],
                xywh_move_RIGHT: [674, 260, 30, 24],
                xywh_move_LEFT: [640, 260, 30, 24],
                xywh_DOWN: [580, 194, 24, 29],
                xywh_UP: [548, 129, 24, 29],
                xywh_RIGHT: [610, 260, 29, 24],
                xywh_LEFT: [545, 228, 29, 24]
        };
        this.onSpritePosition = onSpriteType === 0 ? blueTankOnSprite : greenTankOnSprite;
        this.context = context;
        spritePromise.then(img=>this.sprite = img)
    }

    draw(state) {
        // ['speed', 'x', 'y', 'h', 'w'].forEach(el => {
        //     if (state[el] === undefined) {
        //         throw new TypeError(`Animate.draw() expect '${el}' parameter will be defined!`);
        //     }
        // });
        if (this.tickPerFrame === undefined) {
            this.tickPerFrame = state.speed < 10 ? 10 - state.speed : 1;
        }
        var imgOnSpriteXYWH_default;
        var imgOnSpriteXYWH_current;
        switch (state.onDirection) {
            case 'DOWN':
                imgOnSpriteXYWH_default = this.onSpritePosition.xywh_move_DOWN;
                imgOnSpriteXYWH_current = [imgOnSpriteXYWH_default[0] - this.onImgStep * 32, ...imgOnSpriteXYWH_default.slice(1, 4)];
                break;
            case 'UP':
                imgOnSpriteXYWH_default = this.onSpritePosition.xywh_move_UP;
                imgOnSpriteXYWH_current = [imgOnSpriteXYWH_default[0] - this.onImgStep * 32, ...imgOnSpriteXYWH_default.slice(1, 4)];
                break;
            case 'RIGHT':
                imgOnSpriteXYWH_default = this.onSpritePosition.xywh_move_RIGHT;
                imgOnSpriteXYWH_current = [imgOnSpriteXYWH_default[0], imgOnSpriteXYWH_default[1] - this.onImgStep * 32, ...imgOnSpriteXYWH_default.slice(2, 4)];
                break;
            case 'LEFT':
                imgOnSpriteXYWH_default = this.onSpritePosition.xywh_move_LEFT;
                imgOnSpriteXYWH_current = [imgOnSpriteXYWH_default[0], imgOnSpriteXYWH_default[1] - this.onImgStep * 32, ...imgOnSpriteXYWH_default.slice(2, 4)];
                break;

            case 'STOP':
                if (this.lastDirection === 'DOWN') {
                    imgOnSpriteXYWH_current = this.onSpritePosition.xywh_DOWN;
                } else if (this.lastDirection === 'UP') {
                    imgOnSpriteXYWH_current = this.onSpritePosition.xywh_UP;
                } else if (this.lastDirection === 'RIGHT') {
                    imgOnSpriteXYWH_current = this.onSpritePosition.xywh_RIGHT;
                } else if (this.lastDirection === 'LEFT') {
                    imgOnSpriteXYWH_current = this.onSpritePosition.xywh_LEFT;
                }
                break;
            default:
                throw new TypeError(`Animate expect 'state' with 'UP', 'DOWN', 'LEFT', 'RIGHT', 'STOP' attribute`);
        }
        if(state.onDirection !=='STOP'){
            this.lastDirection = state.onDirection;
        }

        this.context.drawImage(this.sprite, ...imgOnSpriteXYWH_current, state.x, state.y, state.w, state.h);

        if (this.currentTick % this.tickPerFrame === 0) {
            this.onImgStep === 6 ? this.onImgStep = 0 : this.onImgStep++;
            this.currentTick = 0;
        }
        this.currentTick++;
    }


}