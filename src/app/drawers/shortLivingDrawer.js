export class ShortLivingDrawer {

    sprite;
    onSpritePosition;

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

    draw(context, state, animationPercent) {
        // ['speed', 'x', 'y', 'h', 'w'].forEach(el => {
        //     if (state[el] === undefined) {
        //         throw new TypeError(`DynamicDrawer.draw() expect '${el}' parameter will be defined!`);
        //     }
        // });

        var imgOnSpriteXYWH_current;


        if (animationPercent < 0.33) {
            imgOnSpriteXYWH_current = this.onSpritePosition[0];
        } else if (0.33 < animationPercent && animationPercent < 0.66) {
            imgOnSpriteXYWH_current = this.onSpritePosition[1];
        } else {
            imgOnSpriteXYWH_current = this.onSpritePosition[0];
        }
        var rate = 1 - 4 * Math.pow(animationPercent - 0.5, 2);
        var imgOnCanvasXYWH = [state.x + (state.w - state.w * rate) / 2, state.y + (state.h - state.h * rate) / 2, state.w * rate, state.h * rate];
        context.drawImage(this.sprite, ...imgOnSpriteXYWH_current, ...imgOnCanvasXYWH);

    }


}