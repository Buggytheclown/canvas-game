export function InDisplay() {
        this._stack = [];

        this.push = function (el) {
            this._stack.push(el);
        };

        this.pop = function (popedEl) {
            this._stack = this._stack.filter(function (el) {
                return JSON.stringify(el) !== JSON.stringify(popedEl)
            })
        };

        this.draw = function (context) {
            this._stack.forEach(function (el) {
                el.draw(context);
            })
        };

        this.clear = function (context) {
            this._stack.forEach(function (el) {
                el.clear(context);
            })
        };

        this.update = function () {
            var _this = this;
            this._stack.forEach(function (elUpdated) {
                var newState = elUpdated.update();

                if (newState) {
                    var elUpdatedCoordinates = _this._calcCorners(newState);

                    _this._stack.forEach(function (stackEl) {
                        if (JSON.stringify(stackEl) !== JSON.stringify(elUpdated)) {
                            var coordinatesStackEl = _this._calcCorners(stackEl.getState());

                            if (_this._intersection(elUpdatedCoordinates, coordinatesStackEl)) {
                                stackEl.hit(elUpdated.getHitBy(), newState);
                                elUpdated.rollBack();
                            }
                        }

                    })
                }

            })
        };

        this._intersection = function (a, b) {
            var crash = true;
            if ((a.bottom < b.top) ||
                    (a.top > b.bottom) ||
                    (a.right < b.left) ||
                    (a.left > b.right)) {
                crash = false;
            }
            return crash;
        };

        this._revertSide = function (side) {
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

        this._calcCorners = function (state) {
            return {left: state.x, right: state.x + state.w, top: state.y, bottom: state.y + state.h};
        };

        this._calcCoordinates = function (side, state) {
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

        this.canMove = function (side, state) {
            console.log('DEPRICATED canMove');
        }
    }