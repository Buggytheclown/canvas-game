export class Keybot {
    currentDirection;
    space;

    constructor() {
        this.currentDirection = 'RIGHT';
        this.space = false;
        this.directions = ['LEFT', 'UP', 'RIGHT', 'DOWN'];
        this.rollBack = ()=> {
            this._rollback()
        };
        setInterval(this.mainLoop.bind(this), 1500);
    }

    mainLoop() {
        this.setRndDirections();
        this.space = Math.random() > 0.75;
    }

    setRndDirections() {
        this.currentDirection = this.directions.filter(el=>el !== this.revertDirections(this.currentDirection))[Math.floor(Math.random() * 3)];
    }

    revertDirections(direction) {
        var newDirection;
        switch (direction) {
            case 'LEFT':
                return 'RIGHT';
                break;
            case 'RIGHT':
                return 'LEFT';
                break;
            case 'UP':
                return 'DOWN';
                break;
            case 'DOWN':
                return 'UP';
                break;
            default:
                throw new TypeError(`Keybot.revertDirections expect ${this.directions} but got ${direction}`)
        }
    }

    get left() {
        return this.currentDirection === 'LEFT';
    }

    get up() {
        return this.currentDirection === 'UP';
    }

    get right() {
        return this.currentDirection === 'RIGHT';
    }

    get down() {
        return this.currentDirection === 'DOWN';
    }

    _rollback() {
        this.setRndDirections();
    }

}