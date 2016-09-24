import {AbstractUnmovable} from "./abstractUnmovable";
import {AbstractMovable} from "./abstractMovable";

export class Wall extends AbstractUnmovable {
    _state;
    _stateChanged = true;
    color;
    gameEngine;

    constructor(gameEngine, state, color) {
        super();
        this._state = state;
        this.color = color;
        this.gameEngine = gameEngine;
    }

    hit(obj, coordinates) {
        if (obj.type === 'BULLET') {
            this.gameEngine.push(new BoomAnimation(this.gameEngine, coordinates));
        }
    };

    draw(context) {
        if (this._stateChanged) {
            this.clear(context);
            context.fillStyle = this.color;
            context.fillRect(this.state.x, this.state.y, this.state.w, this.state.h);
            this._stateChanged = false;
        }
    };

    clear(context) {
        context.clearRect(this.state.x, this.state.y, this.state.w, this.state.h)
    };

    get state() {
        return this._state;
    };
}

class BoomAnimation extends AbstractMovable{
    _state;
    color;
    frameLength;

    constructor(inDisplay, state) {
        super();
        this.gameEngine = inDisplay;
        this._state = state;
        this.color = 'green';
        this.frameLength = 150;
    }

    update(context) {
        if (this.frameLength > 0) {
            this.frameLength--;
        } else {
            this.gameEngine.pop(this);
            this.clear(context);
        }
        return null;
    };

    getHitBy(){
        return null;
    }

    rollBack(){
        return null;
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this._state.x, this._state.y, this._state.w + 4, this._state.h + 4);
    };

    clear(context) {
        context.clearRect(this._state.x, this._state.y, this._state.w + 4, this._state.h + 4);
    };

    get state() {
        return this._state;
    };

    hit() {
        return;
    }

}