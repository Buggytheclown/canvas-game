import {AbstractMovable} from "./abstractMovable";


export class Gun {

    bulletState;
    gunState;
    gameEngine;
    bulletRollBackDrawer;

    constructor(gameEngine, bulletDrawer, bulletRollBackDrawer) {
        this.bulletDrawer = bulletDrawer;
        this.gameEngine = gameEngine;
        this.bulletRollBackDrawer = bulletRollBackDrawer;
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
            // gunner come first in engine array (
            var delta = (gunnerState.inMove ? gunnerState.speed : 0) + 1;
            switch (gunnerState.onDirection) {
                case 'UP':
                    [bulletState.w, bulletState.h] = [bulletState.h, bulletState.w];
                    bulletState.x = gunnerState.x + gunnerState.w / 2 - bulletState.w/2;
                    bulletState.y = gunnerState.y - bulletState.h - delta;
                    bulletState.onDirection = 'UP';
                    break;
                case 'DOWN':
                    [bulletState.w, bulletState.h] = [bulletState.h, bulletState.w];
                    bulletState.x = gunnerState.x + gunnerState.w / 2 - bulletState.w/2;
                    bulletState.y = gunnerState.y + gunnerState.h + delta;
                    bulletState.onDirection = 'DOWN';
                    break;
                case 'LEFT':
                    bulletState.x = gunnerState.x - bulletState.w - delta;
                    bulletState.y = gunnerState.y + gunnerState.h / 2 - bulletState.h/2;
                    bulletState.onDirection = 'LEFT';
                    break;
                case 'RIGHT':
                    bulletState.x = gunnerState.x + gunnerState.w + delta;
                    bulletState.y = gunnerState.y + gunnerState.h / 2 - bulletState.h/2;
                    bulletState.onDirection = 'RIGHT';
                    break;
                default:
                    throw new TypeError(`Gun.shoot() expect 'LEFT', 'RIGHT', 'UP', 'DOWN' but got ${gunnerState.onDirection}`);
                    break;
            }
            bulletState.x = Math.round(bulletState.x);
            bulletState.y = Math.round(bulletState.y);
            var bullet = new Bullet(this.gameEngine, bulletState, this.bulletDrawer, this.bulletRollBackDrawer);
            this.gameEngine.push(bullet);
            this.gunState.frameToShoot = this.gunState.framePerBullet;
        }
    };
}


class Bullet extends AbstractMovable {

    _state;
    _prevState;
    gameEngine;
    rollBackDrawer;

    constructor(gameEngine, state, drawer, rollBackDrawer) {
        super();
        this.updDescription({type: 'BULLET'});
        this.drawer = drawer;
        this.gameEngine = gameEngine;
        this.rollBackDrawer = rollBackDrawer;
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
        return null;
    };

    setState(newStateParam) {
        var newState = Object.assign({}, this.state, newStateParam);
        this._prevState = this._state;
        this._state = newState;
    };

    hit(obj) {
        console.log('Bullet was hitten by: ', obj.type)
    };

    rollBack(context) {
        this.clear(context);
        // TODO type: BULLET - crutch!
        this.rollBackDrawer.hit({type:'BULLET'}, Object.assign({}, this.state));
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