import {AbstractMovable} from "./abstractMovable";


export class Gun {

    bulletState;
    gunState;
    inDisplay;

    constructor(inDisplay) {
        this.inDisplay = inDisplay;
        this.gunState = {framePerBullet: 40, frameToShoot: 0};
        this.bulletState = {x: null, y: null, h: 3, w: 3, onDirection: null, speed: 10, color: 'red'}
    }

    update() {
        if (this.gunState.frameToShoot !== 0) {
            this.gunState.frameToShoot--;
        }
    };

    shoot(gunnerState) {
        if (this.gunState.frameToShoot === 0) {
            var bulletState = Object.assign({}, this.bulletState);
            switch (gunnerState.onDirection) {
                case 'RIGHT':
                    bulletState.x += this._height;
                    break;
                case 'DOWN':
                    bulletState.y += this._height;
                    break;
            }
            var bullet = new Bullet(this.bulletState, this.inDisplay);
            this.inDisplay.push(bullet);
            this.gunState.frameToShoot = this.gunState.framePerBullet;
        }
    };
}


class Bullet extends AbstractMovable{

    _state;
    _prevState;
    inDisplay;

    constructor(state, inDisplay) {
        super();
        this.inDisplay = inDisplay;
        this._state = this._prevState = state;
    }

    get state(){
        return this._state;
    }


    update() {
        var newState;
        switch (this.state.onDirection) {
            case 'LEFT':
                newState = this._setState({x: this.getState().x - this.speed});
                return newState;
                break;
            case 'RIGHT':
                newState = this._setState({x: this.getState().x + this.speed});
                return newState;
                break;
            case 'UP':
                newState = this._setState({y: this.getState().y - this.speed});
                return newState;
                break;
            case 'DOWN':
                newState = this._setState({y: this.getState().y + this.speed});
                return newState;
                break;
            default:
                throw new TypeError(`Bullet.update() expect 'LEFT', 'RIGHT', 'UP', 'DOWN' but got ${this.state.onDirection}`);
                break;
        }
    };

    getHitBy() {
        return {type: 'BULLET'}
    };

    _setState(newStateParam) {
        var newState = Object.assign({}, this.getState(), newStateParam);
        this._prevState = this._state;
        this._state = newState;
        return newState;
    };

    hit(obj) {
        console.log('Bullet was hitten by: ', obj.type)
    };

    rollBack() {
        console.log('Bullet rollBack!');
        this.inDisplay.pop(this);
    };

    draw(context) {
        this.clear(context);
        context.fillStyle = this.color;
        var coordinates = this.getState();
        context.fillRect(coordinates.x, coordinates.y, coordinates.h, coordinates.w);
    };

    clear(context) {
        var coordinates = this.getState();
        context.clearRect(coordinates.x, coordinates.y, coordinates.h, coordinates.w);
    };

}