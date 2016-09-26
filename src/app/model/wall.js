import {AbstractUnmovable} from "./abstractUnmovable";

export class Wall extends AbstractUnmovable {
    state;
    drawer;

    constructor({state, drawer}) {
        super();
        this.state = Object.assign(state, {onStage: 0});
        this.drawer = drawer;
    }

    hit(gameEngine, obj) {
        if (obj.type === 'BULLET') {
            if (this.state.onStage === 3) {
                gameEngine.pop(this);
            } else {
                this.state.onStage++;
            }
        }
    };

    draw(gameEngine) {
        this.drawer.draw(gameEngine, this.state)
    };

}

