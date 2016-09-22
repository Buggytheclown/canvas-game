export class Wall {
    _state;
    color;
    inDisplay;

    constructor(inDisplay, x, y, h, w, color) {
        this._state = {x: x, y: y, h: h, w: w};
        this.color = color;
        this.inDisplay = inDisplay;
    }

    update() {
        return null;
    };

    hit(obj, coordinates) {
        if (obj.type === 'BULLET') {
            this.inDisplay.push(new BoomAnimation(coordinates));
        }
    };

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.state.x, this.state.y, this.state.w, this.state.h);
    };

    clear(context) {
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