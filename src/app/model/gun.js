import {AbstractMovable} from "./abstractMovable";


export class Gun {

    bulletState;
    gunState;
    gameEngine;

    constructor(gameEngine, bulletDrawer) {
        this.bulletDrawer = bulletDrawer;
        this.gameEngine = gameEngine;
        this.gunState = {framePerBullet: 40, frameToShoot: 0};
        this.bulletState = {x: null, y: null, h: 5, w: 8, onDirection: null, speed: 8}
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
                case 'UP':
                    bulletState.x = gunnerState.x + gunnerState.w / 2;
                    bulletState.y = gunnerState.y - bulletState.h - 20;
                    bulletState.onDirection = 'UP';
                    break;
                case 'DOWN':
                    bulletState.x = gunnerState.x + gunnerState.w / 2;
                    bulletState.y = gunnerState.y + gunnerState.h + bulletState.h +20;
                    bulletState.onDirection = 'DOWN';
                    break;
                case 'LEFT':
                    bulletState.x = gunnerState.x - bulletState.w -20;
                    bulletState.y = gunnerState.y + gunnerState.h / 2;
                    bulletState.onDirection = 'LEFT';
                    break;
                case 'RIGHT':
                    bulletState.x = gunnerState.x + gunnerState.w + bulletState.h;
                    bulletState.y = gunnerState.y + gunnerState.h / 2;
                    bulletState.onDirection = 'RIGHT';
                    break;
                default:
                    throw new TypeError(`Gun.shoot() expect 'LEFT', 'RIGHT', 'UP', 'DOWN' but got ${gunnerState.onDirection}`);
                    break;
            }
            var bullet = new Bullet(this.gameEngine, bulletState, this.bulletDrawer);
            this.gameEngine.push(bullet);
            this.gunState.frameToShoot = this.gunState.framePerBullet;
        }
    };
}


class Bullet extends AbstractMovable {

    _state;
    _prevState;
    gameEngine;

    constructor(gameEngine, state, drawer) {
        super();
        this.drawer = drawer;
        this.gameEngine = gameEngine;
        if(state.onDirection === 'UP' || state.onDirection === 'DOWN'){
            [state.w, state.h] = [state.h, state.w];
        }
        this._state = this._prevState = state;
    }

    get state() {
        return this._state;
    }

    update() {
        switch (this.state.onDirection) {
            case 'LEFT':
                this.setState({x: this.state.x - this.state.speed});
                break;
            case 'RIGHT':
                this.setState({x: this.state.x + this.state.speed});
                break;
            case 'UP':
                this.setState({y: this.state.y - this.state.speed});
                break;
            case 'DOWN':
                this.setState({y: this.state.y + this.state.speed});
                break;
            default:
                throw new TypeError(`Bullet.update() expect 'LEFT', 'RIGHT', 'UP', 'DOWN' but got ${this.state.onDirection}`);
                break;
        }
        return this.state;
    };

    getHitBy() {
        return {type: 'BULLET'}
    };

    setState(newStateParam) {
        var newState = Object.assign({}, this.state, newStateParam);
        this._prevState = this._state;
        this._state = newState;
        return newState;
    };

    hit(obj) {
        console.log('Bullet was hitten by: ', obj.type)
    };

    rollBack(context) {
        this.clear(context);
        this.gameEngine.pop(this);
    };

    draw(context) {
        this.clear(context);
        this.drawer.draw(context, this.state)
    };

    clear(context) {
        var coordinates = this._prevState;
        context.clearRect(coordinates.x, coordinates.y, coordinates.w, coordinates.h);
    };

}