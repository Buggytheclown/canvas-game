import {AbstractUnmovable} from "./abstractUnmovable";

export class Wall extends AbstractUnmovable {
    _state;
    _stateChanged = true;
    color;
    inDisplay;

    constructor(inDisplay, state, color) {
        super();
        this._state = state;
        this.color = color;
        this.inDisplay = inDisplay;
    }

    hit(obj, coordinates) {
        if (obj.type === 'BULLET') {
            this.inDisplay.push(new BoomAnimation(coordinates));
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

class BoomAnimation {
    _state;
    color;
    frameLength;

    constructor(state) {
        this._state = state;
        this.color = 'red';
        this.frameLength = 150;
    }

    update() {
        if (this.frameLength > 0) {
            this.frameLength--;
        } else {
            inDisplay.pop(this);
            this.clear();
        }
        return null;
    };

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this._state.x, this._state.y, this._state.w + 2, this._state.h + 2);
    };

    clear(context) {
        context.clearRect(this._state.x, this._state.y, this._state.w + 2, this._state.h + 2);
    };

    get state() {
        return this._state;
    };

    hit() {
        return;
    }

}