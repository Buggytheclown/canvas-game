import {ShortLiving} from "../model/shortLiving";
import {ShortLivingDrawer} from "../drawers/shortLivingDrawer";

export class BoomAnimate {
    constructor(spritePromise) {
        var smallBooomsOnSpriteXYWH = [[268, 12, 9, 9], [238, 14, 6, 6], [268, 12, 9, 9]];
        this.boomWH = {w: 10, h: 10};
        this.onBulletDrawer = new ShortLivingDrawer({spritePromise, onSpritePosition: smallBooomsOnSpriteXYWH});

    }

    draw(gameEngine, coordinates) {
        Object.assign(coordinates, this.boomWH);
        gameEngine.push(new ShortLiving(coordinates, this.onBulletDrawer));
    }
}