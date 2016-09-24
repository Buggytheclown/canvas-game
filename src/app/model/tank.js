import {AbstractMovable} from "./abstractMovable";


export class Tank extends AbstractMovable {
    _stateChanged = true;
    state;
    prevState;
    driver;
    gun;

    constructor({gameEngine, driver, drawer, state, gun}) {
        super();
        this.prevState = this.state = {...state, ...{onDirection: 'RIGHT', inMove: true}};
        this.driver = driver;
        this.drawer = drawer;
        this.gun = gun;
    }

    draw(context) {
        if (this._stateChanged) {
            this.clear(context);
            this.drawer.draw(context, this.state);
            this._stateChanged = false;
        }
    };

    clear(context) {
        context.clearRect(this.prevState.x, this.prevState.y, this.prevState.w, this.prevState.h);
    };

    hit(obj) {
        console.log('Tank was hitten by: ', obj.type);
    };

    getHitBy() {
        return {type: 'TANK'};
    };

    rollBack() {
        this.state = this.prevState;
        this.driver.rollBack();
    };

    setState(newStateParam) {
        this.prevState = this.state;
        this.state = Object.assign({}, this.state, newStateParam);
        this._stateChanged = true;
    };

    update() {
        this.gun.update();

        if (this.driver.left) {
            this.setState({x: this.state.x - this.state.speed, onDirection: 'LEFT', inMove: true});

        } else if (this.driver.right) {
            this.setState({x: this.state.x + this.state.speed, onDirection: 'RIGHT', inMove: true});

        } else if (this.driver.up) {
            this.setState({y: this.state.y - this.state.speed, onDirection: 'UP', inMove: true});

        } else if (this.driver.down) {
            this.setState({y: this.state.y + this.state.speed, onDirection: 'DOWN', inMove: true});

        } else {
                this.setState({inMove: false});
        }


        if (this.driver.space) {
            this.gun.shoot({...this.state, ...{onDirection: this.prevState.onDirection}});
        }

        return this.state;
    }


}