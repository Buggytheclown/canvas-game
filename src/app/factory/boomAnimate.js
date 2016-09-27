import {ShortLiving} from "../model/shortLiving";
import {ShortLivingDrawer} from "../drawers/shortLivingDrawer";

export class BoomAnimate {
    constructor({spritePromise, onSpritePosition, boomWH}) {

        this.boomWH = boomWH;
        this.onBoomDrawer = new ShortLivingDrawer({spritePromise, onSpritePosition});

    }

    draw(gameEngine, coordinates) {
        coordinates.x = coordinates.x+ coordinates.w/2;
        coordinates.y = coordinates.y+ coordinates.h/2;
        Object.assign(coordinates, this.boomWH);
        gameEngine.push(new ShortLiving(coordinates, this.onBoomDrawer));
    }
}