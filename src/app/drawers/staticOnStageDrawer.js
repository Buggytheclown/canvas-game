export class StaticOnStageDrawer {
    sprite;
    onSpritePosition;

    constructor({spritePromise}) {
        // Invariant check
        // ['xywh_move_DOWN', 'xywh_move_UP', 'xywh_move_RIGHT',
        //     'xywh_move_LEFT', 'xywh_DOWN', 'xywh_UP',
        //     'xywh_RIGHT', 'xywh_LEFT'].forEach(el => {
        //     if (onSpritePosition[el] === undefined) {
        //         throw new TypeError(`DynamicDrawer expect '${el}' parameter will be defined!`);
        //     }
        // });

        var whiteWallOnSprite = {
            xywh_0: [320, 32, 30, 30],
            xywh_1: [288, 224, 30, 30],
            xywh_2: [320, 224, 30, 30],
            xywh_3: [351, 224, 30, 30],
        };
        this.onSpritePosition = whiteWallOnSprite;
        spritePromise.then(img=>this.sprite = img)
    }

    draw(context, state) {
        // ['speed', 'x', 'y', 'h', 'w'].forEach(el => {
        //     if (state[el] === undefined) {
        //         throw new TypeError(`DynamicDrawer.draw() expect '${el}' parameter will be defined!`);
        //     }
        // });

        var imgOnSpriteXYWH_current = this.onSpritePosition['xywh_' + state.onStage];

        context.drawImage(this.sprite, ...imgOnSpriteXYWH_current, state.x, state.y, state.w, state.h);

    }


}