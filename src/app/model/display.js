export class InDisplay {

    displaySize;
    _stack = [];

    constructor(displaySize) {
        this.displaySize = {left: 0, right: displaySize.x, top: 0, bottom: displaySize.y};
    }

    push(el) {
        this._stack.push(el);
    };

    pop(popedEl) {
        this._stack = this._stack.filter(function (el) {
            return el.state !== popedEl.state
        })
    };

    draw(context) {
        this._stack.forEach(el => el.draw(context))
    };

    clear(context) {
        this._stack.forEach(el => el.clear(context))
    };

    update() {
        this._stack.forEach(elUpdated => {
            var newState = elUpdated.update();

            if (newState) {
                var elUpdatedCoordinates = this._calcCorners(newState);
                if (this._isElementInDisplay(elUpdatedCoordinates)) {
                    this._stack.forEach(stackEl=> {
                        if (stackEl.state !== elUpdated.state) {
                            var coordinatesStackEl = this._calcCorners(stackEl.state);

                            if (this._intersection(elUpdatedCoordinates, coordinatesStackEl)) {
                                stackEl.hit(elUpdated.getHitBy(), newState);
                                elUpdated.rollBack();
                            }
                        }

                    })
                } else {
                    elUpdated.rollBack();
                }
            }

        })
    };

    _isElementInDisplay(objCoor) {
        var ds = this.displaySize;
        return objCoor.left > ds.left && objCoor.right < ds.right &&
            objCoor.top > ds.top && objCoor.bottom < ds.bottom
    };

    _intersection(a, b) {
        var crash = true;
        if ((a.bottom < b.top) ||
            (a.top > b.bottom) ||
            (a.right < b.left) ||
            (a.left > b.right)) {
            crash = false;
        }
        return crash;
    };

    _revertSide(side) {
        switch (side) {
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
        }
    };

    _calcCorners(state) {
        // if(state.x && state.w && state.y && state.h) {
            return {left: state.x, right: state.x + state.w, top: state.y, bottom: state.y + state.h};
        // } else {
        //     throw new TypeError(`_calcCorners got a bad state to calc:`, state.x, state.y)
        // }
    };

    _calcCoordinates = function (side, state) {
        var coordinates = {x1: null, y1: null, x2: null, y2: null};
        switch (side) {
            case 'LEFT':
                coordinates.x1 = state.x;
                coordinates.y1 = state.y;
                coordinates.x2 = state.x;
                coordinates.y2 = state.y + state.h;
                break;
            case 'RIGHT':
                coordinates.x1 = state.x + state.w;
                coordinates.y1 = state.y;
                coordinates.x2 = state.x + state.w;
                coordinates.y2 = state.y + state.h;
                break;
            case 'UP':
                coordinates.x1 = state.x;
                coordinates.y1 = state.y;
                coordinates.x2 = state.x + state.w;
                coordinates.y2 = state.y;
                break;
            case 'DOWN':
                coordinates.x1 = state.x;
                coordinates.y1 = state.y + state.h;
                coordinates.x2 = state.x + state.w;
                coordinates.y2 = state.y + state.h;
                break;
            default:
                console.log('BAD side in getCoordinates');
        }
        return coordinates;
    };

}