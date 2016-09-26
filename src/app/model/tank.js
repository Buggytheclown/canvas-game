import {AbstractMovable} from "./abstractMovable";


export class Tank extends AbstractMovable {
    _stateChanged = true;
    state;
    prevState;
    driver;
    gun;

    constructor({driver, drawer, state, gun, rollBackDrawer}) {
        super();
        this.updDescription({type: 'TANK'});
        this.prevState = this.state = {...state, ...{onDirection: 'RIGHT', inMove: true}};
        this.rollBackDrawer = rollBackDrawer;
        this.driver = driver;
        this.drawer = drawer;
        this.gun = gun;
    }

    draw(gameEngine) {
        this.drawer.draw(gameEngine, this.state);
    };


    hit(gameEngine, obj) {
        if(obj.type === 'BULLET' && obj.owner !== this.state.owner){
            this.rollBackDrawer.draw(gameEngine, Object.assign({}, this.state));
            gameEngine.pop(this);
        }
    };

    rollBack() {
        this.state = this.prevState;
        this.driver.rollBack();
    };

    setState(newStateParam) {
        this.prevState = this.state;
        this.state = Object.assign({}, this.state, newStateParam);
    };

    update(gameEngine) {
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
            this.gun.shoot(gameEngine, Object.assign({}, this.state, {onDirection: this.prevState.onDirection}));
        }

        return this.state;
    }


}