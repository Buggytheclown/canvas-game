export class ShortLivingDrawer {

    constructor({spritePromise, onSpritePosition}) {
        // Invariant check
        // ['xywh_move_DOWN', 'xywh_move_UP', 'xywh_move_RIGHT',
        //     'xywh_move_LEFT', 'xywh_DOWN', 'xywh_UP',
        //     'xywh_RIGHT', 'xywh_LEFT'].forEach(el => {
        //     if (onSpritePosition[el] === undefined) {
        //         throw new TypeError(`DynamicDrawer expect '${el}' parameter will be defined!`);
        //     }
        // });


        this.onSpritePosition = onSpritePosition;
        spritePromise.then(img=>this.sprite = img)
    }

    draw(gameEngine, state, animationPercent) {

        var onSpriteInd = Math.floor(animationPercent * this.onSpritePosition.length);
        onSpriteInd = onSpriteInd === this.onSpritePosition.length ? onSpriteInd - 1 : onSpriteInd;
        var imgOnSpriteXYWH_current = this.onSpritePosition[onSpriteInd];
        var rate = 1 - 4 * Math.pow(animationPercent, 2);
        // var stateXCentre = state.x + state.w/2;
        // var stateYCentre = state.y + state.h/2;
        var imgOnCanvasXYWH = [state.x + (state.w - state.w * rate) / 2, state.y + (state.h - state.h * rate) / 2, state.w * rate, state.h * rate];
        gameEngine.context.drawImage(this.sprite, ...imgOnSpriteXYWH_current, ...imgOnCanvasXYWH);

    }


}