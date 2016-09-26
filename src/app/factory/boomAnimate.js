import {ShortLiving} from "../model/shortLiving";
import {ShortLivingDrawer} from "../drawers/shortLivingDrawer";

export class BoomAnimate {
    constructor(gameEngine, spritePromise) {
        var smallBooomsOnSpriteXYWH = [[268, 12, 9, 9], [238, 14, 6, 6]];
        this.boomWH = {w: 10, h: 10};
        this.gameEngine = gameEngine;
        this.onBulletDrawer = new ShortLivingDrawer({spritePromise, onSpritePosition: smallBooomsOnSpriteXYWH});

    }

    draw(coordinates) {
        Object.assign(coordinates, this.boomWH);
        this.gameEngine.push(new ShortLiving(this.gameEngine, coordinates, this.onBulletDrawer));
    }
}