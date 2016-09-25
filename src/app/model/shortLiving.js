import {AbstractMovable} from "./abstractMovable";


export class ShortLiving extends AbstractMovable {
    state;
    frameLength;
    drawer;

    constructor(gameEngine, state, drawer) {
        super();
        this.gameEngine=gameEngine;
        this.updDescription({haveHitBox: false});
        this.drawer = drawer;
        this.state = state;
        this.frameLength = 30;
        this.onFrame = 0;
    }

    getHitBy() {
        return null;
    }

    rollBack() {
        return null;
    }

    hit() {
        return null;
    }

    update(context) {
        if (this.onFrame < this.frameLength) {
            this.onFrame++;
        } else {
            this.gameEngine.pop(this);
            this.clear(context);
        }
        return null;
    };

    draw(context) {
        this.clear(context);
        this.drawer.draw(context, this.state, this.onFrame/this.frameLength);
    };

    clear(context) {
        context.clearRect(this.state.x, this.state.y, this.state.w, this.state.h);
    };


}