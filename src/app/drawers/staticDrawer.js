export class StaticDrawer {
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

        var bulletOnSprite = {
            xywh_DOWN: [206, 12, 5, 8],
            xywh_UP: [110, 12, 5, 8],
            xywh_RIGHT: [172, 14, 8, 5],
            xywh_LEFT: [140, 14, 8, 5]
        };
        this.onSpritePosition = bulletOnSprite;
        spritePromise.then(img=>this.sprite = img)
    }

    draw(context, state) {
        // ['speed', 'x', 'y', 'h', 'w'].forEach(el => {
        //     if (state[el] === undefined) {
        //         throw new TypeError(`DynamicDrawer.draw() expect '${el}' parameter will be defined!`);
        //     }
        // });

        var imgOnSpriteXYWH_current = this.onSpritePosition['xywh_' + state.onDirection];

        context.drawImage(this.sprite, ...imgOnSpriteXYWH_current, state.x, state.y, state.w, state.h);

    }


}