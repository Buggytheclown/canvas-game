import {AbstractMovable} from "./abstractMovable";


export class ShortLiving extends AbstractMovable {
    state;
    frameLength;
    drawer;

    constructor(state, drawer) {
        super();
        this.updDescription({haveHitBox: false});
        this.drawer = drawer;
        this.state = state;
        this.frameLength = 30;
        this.onFrame = 0;
    }

    rollBack() {
        return null;
    }

    hit() {
        return null;
    }

    update(gameEngine) {
        if (this.onFrame < this.frameLength) {
            this.onFrame++;
        } else {
            gameEngine.pop(this);
        }
        return null;
    };

    draw(gameEngine) {
        this.drawer.draw(gameEngine, this.state, this.onFrame/this.frameLength);
    };

}