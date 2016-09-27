import {AbstractMovable} from "./abstractMovable";


export class Gun {

    constructor({bulletDrawer, bulletRollBackDrawer, bulletSpeed, framePerBullet}) {
        this.bulletDrawer = bulletDrawer;
        this.bulletRollBackDrawer = bulletRollBackDrawer;
        this.gunState = {framePerBullet: framePerBullet, frameToShoot: 0};
        this.bulletState = {x: null, y: null, h: 5, w: 8, onDirection: null, speed: bulletSpeed}
    }

    update() {
        if (this.gunState.frameToShoot !== 0) {
            this.gunState.frameToShoot--;
        }
    };

    shoot(gameEngine, gunnerState) {
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
            var bullet = new Bullet(bulletState, this.bulletDrawer, this.bulletRollBackDrawer, gunnerState.owner);
            gameEngine.push(bullet);
            this.gunState.frameToShoot = this.gunState.framePerBullet;
        }
    };
}


class Bullet extends AbstractMovable {

    _state;
    _prevState;
    rollBackDrawer;

    constructor(state, drawer, rollBackDrawer, owner) {
        super();
        this.updDescription({type: 'BULLET', owner});
        this.drawer = drawer;
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

    setState(newStateParam) {
        var newState = Object.assign({}, this.state, newStateParam);
        this._prevState = this._state;
        this._state = newState;
    };

    hit(gameEngine) {
        gameEngine.pop(this);
    };

    rollBack(gameEngine) {
        this.rollBackDrawer.draw(gameEngine, Object.assign({}, this.state));
        gameEngine.pop(this);
    };

    draw(gameEngine) {
        this.drawer.draw(gameEngine, this.state)
    };

}