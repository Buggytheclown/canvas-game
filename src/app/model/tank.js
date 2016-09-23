import {AbstractMovable} from "./abstractMovable";


export class Tank extends AbstractMovable {
    _stateChanged = true;
    _state;
    _prevState;
    driver;
    // barrel;

    constructor({inDisplay, driver, drawer, state}) {
        super();
        this._prevState = this._state = {...state, ...{onDirection: 'STOP'}};
        this.driver = driver;
        this.drawer = drawer;
        // this.barrel = new Barrel();
    }

    get state() {
        return this._state;
    }

    draw(context) {
        // this._calculateState();
        if (this._stateChanged) {
            this.clear(context);
            this.drawer.draw(this.state);
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