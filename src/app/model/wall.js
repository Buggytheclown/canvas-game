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
                // TODO crunch!
                this.clear(this.context);
                this.gameEngine.pop(this);
            } else {
                this.state.onStage++;
            }
        }
    };

    draw(context) {
        this.context = context;
        this.clear(context);
        this.drawer.draw(context, this.state)
    };

    clear(context) {
        context.clearRect(this.state.x, this.state.y, this.state.w, this.state.h)
    };


}

