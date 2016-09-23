import {AbstractMovable} from "./abstractMovable";


export class Tank extends AbstractMovable {
    _stateChanged = true;
    _state;
    _prevState;
    driver;
    // barrel;

    constructor(inDisplay, driver, state) {
        super();
        this._prevState = this._state = {...state, ...{onDirection: 'STOP'}};
        this.driver = driver;
        // this.barrel = new Barrel();
    }

    get state() {
        return this._state;
    }

    draw(context) {
        // this._calculateState();
        if (this._stateChanged) {
            this.clear(context);
            context.fillStyle = this.state.color;
            context.fillRect(this._state.x, this._state.y, this._state.w, this._state.h);
            this._stateChanged = false;
        }
        // this.barrel.draw(this);
    };

    clear(context) {
        context.clearRect(this._prevState.x, this._prevState.y, this._prevState.w, this._prevState.h);
        // this.barrel.clear(context);
    };

    // _calculateState() {
    //     switch (this.state.onDirection) {
    //         case 'RIGHT':
    //         case 'LEFT':
    //             this._state.x = tank.x;
    //             this._state.y = tank.y;
    //             this._state.h = this._height;
    //             this._state.w = this._width;
    //             break;
    //         case 'DOWN':
    //         case 'UP':
    //             this._state.x = tank.x - (this._height - this._width) / 2;
    //             this._state.y = tank.y + (this._height - this._width) / 2;
    //             this._state.h = this._width;
    //             this._state.w = this._height;
    //             break;
    //     }
    // };

    // function Barrel() {
    //     this._color = 'black';
    //     this._height = 20;
    //     this._innerHeight = 10;
    //     this._width = 4;
    //     this.state = {x: null, y: null, h: null, w: null, color: this._color};
    //     this.bullet = {speed: 10, color: 'red', framePerBullet: 40, _frameToShoot: 0};
    //
    //     this._calculateState = function (tank) {
    //         switch (tank.onDirection) {
    //             case 'LEFT':
    //                 this.state.x = tank.body._state.x - this._height + this._innerHeight;
    //                 this.state.y = tank.body._state.y + tank.body._state.h / 2 - this._width / 2;
    //                 this.state.h = this._width;
    //                 this.state.w = this._height;
    //                 break;
    //             case 'RIGHT':
    //                 this.state.x = tank.body._state.x + tank.body._state.w - this._innerHeight;
    //                 this.state.y = tank.body._state.y + tank.body._state.h / 2 - this._width / 2;
    //                 this.state.h = this._width;
    //                 this.state.w = this._height;
    //                 break;
    //             case 'UP':
    //                 this.state.x = tank.body._state.x + tank.body._state.w / 2 - this._width / 2;
    //                 this.state.y = tank.body._state.y - this._height + this._innerHeight;
    //                 this.state.h = this._height;
    //                 this.state.w = this._width;
    //                 break;
    //             case 'DOWN':
    //                 this.state.x = tank.body._state.x + tank.body._state.w / 2 - this._width / 2;
    //                 this.state.y = tank.body._state.y + tank.body._state.h - this._innerHeight;
    //                 this.state.h = this._height;
    //                 this.state.w = this._width;
    //                 break;
    //         }
    //     };
    //
    //     this.draw = function (tank) {
    //         this._calculateState(tank);
    //
    //         context.fillStyle = this._color;
    //         context.fillRect(this.state.x, this.state.y, this.state.w, this.state.h);
    //     };
    //
    //     this.clear = function (context) {
    //         context.clearRect(this.state.x, this.state.y, this.state.w, this.state.h);
    //     };
    //
    //     this.update = function () {
    //         if (this.bullet._frameToShoot !== 0) {
    //             this.bullet._frameToShoot--;
    //         }
    //     };
    //
    //     function Bullet(x, y, speed, direction, color) {
    //         this._prevState = null;
    //         this._state = {x: x, y: y, w: 3, h: 3};
    //         this.speed = speed;
    //         this.color = color;
    //         this.direction = direction;
    //
    //         this.update = function () {
    //             switch (this.direction) {
    //                 case 'LEFT':
    //                     var newState = this._setState({x: this.getState().x - this.speed});
    //                     return newState;
    //                     break;
    //                 case 'RIGHT':
    //                     var newState = this._setState({x: this.getState().x + this.speed});
    //                     return newState;
    //                     break;
    //                 case 'UP':
    //                     var newState = this._setState({y: this.getState().y - this.speed});
    //                     return newState;
    //                     break;
    //                 case 'DOWN':
    //                     var newState = this._setState({y: this.getState().y + this.speed});
    //                     return newState;
    //                     break;
    //             }
    //         };
    //
    //         this.getHitBy = function () {
    //             return {type: 'BULLET'}
    //         };
    //
    //         this._setState = function (newStateParam) {
    //             var newState = Object.assign({}, this.getState(), newStateParam);
    //             this._prevState = this._state;
    //             this._state = newState;
    //             return newState;
    //         };
    //
    //         this.hit = function (obj) {
    //             console.log('Bullet was hitten by: ', obj.type)
    //         };
    //
    //         this.rollBack = function () {
    //             console.log('Bullet rollBack!');
    //             inDisplay.pop(this);
    //         };
    //
    //         this.draw = function () {
    //             context.fillStyle = this.color;
    //             var coordinates = this.getState();
    //             context.fillRect(coordinates.x, coordinates.y, coordinates.h, coordinates.w);
    //         };
    //
    //         this.clear = function () {
    //             var coordinates = this.getState();
    //             context.clearRect(coordinates.x, coordinates.y, coordinates.h, coordinates.w);
    //         };
    //
    //         this.getState = function () {
    //             return this._state;
    //         }
    //
    //     }
    //
    //     this.shoot = function (tank) {
    //         if (this.bullet._frameToShoot === 0) {
    //             var bulletState = Object.assign({}, this.state);
    //             switch (tank.onDirection) {
    //                 case 'RIGHT':
    //                     bulletState.x += this._height;
    //                     break;
    //                 case 'DOWN':
    //                     bulletState.y += this._height;
    //                     break;
    //             }
    //             var bullet = new Bullet(bulletState.x, bulletState.y, this.bullet.speed, tank.onDirection, this.bullet.color);
    //             inDisplay.push(bullet);
    //             this.bullet._frameToShoot = this.bullet.framePerBullet;
    //         }
    //     };
    // }

    hit(obj) {
        console.log('Tank was hitten by: ', obj.type);
    };

    getHitBy() {
        return {type: 'TANK'};
    };

    rollBack() {
        this._state = this._prevState;
    };

    setState(newStateParam) {
        this._prevState = this._state;
        this._state = Object.assign({}, this.state, newStateParam);
        this._stateChanged = true;
    };

    update() {
        // this.barrel.update();

        if (this.driver.left) {
            // if(this.state.onDirection === 'LEFT') {
            this.setState({x: this.state.x - this.state.speed, onDirection: 'LEFT'});
            // }

        } else if (this.driver.right) {
            this.setState({x: this.state.x + this.state.speed, onDirection: 'RIGHT'});

        } else if (this.driver.up) {
            this.setState({y: this.state.y - this.state.speed, onDirection: 'UP'});

        } else if (this.driver.down) {
            this.setState({y: this.state.y + this.state.speed, onDirection: 'DOWN'});

        } else {
            if (this.state.onDirection !== 'STOP') {
                this.setState({onDirection: 'STOP'});
            }
        }


        // if (keyboard.space) {
        //     this.barrel.shoot(this);
        // }

        return this.state;
    }


}