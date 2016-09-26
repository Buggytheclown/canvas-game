import {AbstractUnmovable} from "./abstractUnmovable";

export class Wall extends AbstractUnmovable {
    state;
    gameEngine;
    drawer;

    constructor({gameEngine, state, drawer}) {
        super();
        this.state = Object.assign(state, {onStage: 0});
        this.drawer = drawer;
        this.gameEngine = gameEngine;
    }

    hit(obj, coordinates) {
        if (obj.type === 'BULLET') {
            if (this.state.onStage === 3) {
                this.gameEngine.pop(this);
            } else {
                this.state.onStage++;
            }
        }
    };

    draw(context) {
        this.drawer.draw(context, this.state)
    };

}

