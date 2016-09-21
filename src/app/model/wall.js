export function Wall(inDisplay, x, y, h, w, color) {
        this._state = {x: x, y: y, h: h, w: w};
        this.color = color;

        this.update = function () {
            return null;
        };

        function BoomAnimation(state) {
            this._state = state;
            this.color = 'red';
            this.frameLength = 150;

            this.update = function () {
                if (this.frameLength > 0) {
                    this.frameLength--;
                } else {
                    inDisplay.pop(this);
                    this.clear();
                }
                return null;
            };
            this.draw = function () {
                context.fillStyle = this.color;
                context.fillRect(this._state.x, this._state.y, this._state.w + 2, this._state.h + 2);
            };

            this.clear = function () {
                context.clearRect(this._state.x, this._state.y, this._state.w + 2, this._state.h + 2);
            };

            this.getState = function () {
                return this._state;
            };

            this.hit = function () {
                return;
            }

        };

        this.hit = function (obj, coordinates) {
            if (obj.type === 'BULLET') {
                inDisplay.push(new BoomAnimation(coordinates));
            }
        };

        this.draw = function (context) {
            context.fillStyle = this.color;
            context.fillRect(this._state.x, this._state.y, this._state.w, this._state.h);
        };

        this.clear = function (context) {
        };

        this.getState = function () {
            return this._state;
        };
    }