export function Tank(inDisplay, keyboard) {
        this.prevX = null;
        this.prevY = null;
        this.x = 150;
        this.y = 150;
        this.speed = 5;
        this.onDirection = 'RIGHT';

        this.body = new Body();
        this.barrel = new Barrel();

        this.draw = function (context) {
            this.body.draw(this);
            this.barrel.draw(this);
        };

        this.clear = function (context) {
            this.body.clear(context);
            this.barrel.clear(context);
        };

        function Body() {
            this._width = 30;
            this._height = 20;
            this._color = "green";
            this._state = {x: null, y: null, h: null, w: null, color: this._color};
            this._prevState = null;

            this.draw = function (tank) {
                this._calculateState(tank);
                context.fillStyle = this._state.color;
                context.fillRect(this._state.x, this._state.y, this._state.w, this._state.h);
            };

            this.update = function () {
            };

            this._calculateState = function (tank) {
                switch (tank.onDirection) {
                    case 'RIGHT':
                    case 'LEFT':
                        this._state.x = tank.x;
                        this._state.y = tank.y;
                        this._state.h = this._height;
                        this._state.w = this._width;
                        break;
                    case 'DOWN':
                    case 'UP':
                        this._state.x = tank.x - (this._height - this._width) / 2;
                        this._state.y = tank.y + (this._height - this._width) / 2;
                        this._state.h = this._width;
                        this._state.w = this._height;
                        break;
                }
            };

            this.clear = function (context) {
                context.clearRect(this._state.x, this._state.y, this._state.w, this._state.h);
            };
        }

        function Barrel() {
            this._color = 'black';
            this._height = 20;
            this._innerHeight = 10;
            this._width = 4;
            this.state = {x: null, y: null, h: null, w: null, color: this._color};
            this.bullet = {speed: 10, color: 'red', framePerBullet: 40, _frameToShoot: 0};

            this._calculateState = function (tank) {
                switch (tank.onDirection) {
                    case 'LEFT':
                        this.state.x = tank.body._state.x - this._height + this._innerHeight;
                        this.state.y = tank.body._state.y + tank.body._state.h / 2 - this._width / 2;
                        this.state.h = this._width;
                        this.state.w = this._height;
                        break;
                    case 'RIGHT':
                        this.state.x = tank.body._state.x + tank.body._state.w - this._innerHeight;
                        this.state.y = tank.body._state.y + tank.body._state.h / 2 - this._width / 2;
                        this.state.h = this._width;
                        this.state.w = this._height;
                        break;
                    case 'UP':
                        this.state.x = tank.body._state.x + tank.body._state.w / 2 - this._width / 2;
                        this.state.y = tank.body._state.y - this._height + this._innerHeight;
                        this.state.h = this._height;
                        this.state.w = this._width;
                        break;
                    case 'DOWN':
                        this.state.x = tank.body._state.x + tank.body._state.w / 2 - this._width / 2;
                        this.state.y = tank.body._state.y + tank.body._state.h - this._innerHeight;
                        this.state.h = this._height;
                        this.state.w = this._width;
                        break;
                }
            };

            this.draw = function (tank) {
                this._calculateState(tank);

                context.fillStyle = this._color;
                context.fillRect(this.state.x, this.state.y, this.state.w, this.state.h);
            };

            this.clear = function (context) {
                context.clearRect(this.state.x, this.state.y, this.state.w, this.state.h);
            };

            this.update = function () {
                if (this.bullet._frameToShoot !== 0) {
                    this.bullet._frameToShoot--;
                }
            };

            function Bullet(x, y, speed, direction, color) {
                this._prevState = null;
                this._state = {x: x, y: y, w: 3, h: 3};
                this.speed = speed;
                this.color = color;
                this.direction = direction;

                this.update = function () {
                    switch (this.direction) {
                        case 'LEFT':
                            var newState = this._setState({x: this.getState().x - this.speed});
                            return newState;
                            break;
                        case 'RIGHT':
                            var newState = this._setState({x: this.getState().x + this.speed});
                            return newState;
                            break;
                        case 'UP':
                            var newState = this._setState({y: this.getState().y - this.speed});
                            return newState;
                            break;
                        case 'DOWN':
                            var newState = this._setState({y: this.getState().y + this.speed});
                            return newState;
                            break;
                    }
                };

                this.getHitBy = function () {
                    return {type: 'BULLET'}
                };

                this._setState = function (newStateParam) {
                    var newState = Object.assign({}, this.getState(), newStateParam);
                    this._prevState = this._state;
                    this._state = newState;
                    return newState;
                };

                this.hit = function (obj) {
                    console.log('Bullet was hitten by: ', obj.type)
                };

                this.rollBack = function () {
                    console.log('Bullet rollBack!');
                    inDisplay.pop(this);
                };

                this.draw = function () {
                    context.fillStyle = this.color;
                    var coordinates = this.getState();
                    context.fillRect(coordinates.x, coordinates.y, coordinates.h, coordinates.w);
                };

                this.clear = function () {
                    var coordinates = this.getState();
                    context.clearRect(coordinates.x, coordinates.y, coordinates.h, coordinates.w);
                };

                this.getState = function () {
                    return this._state;
                }

            }

            this.shoot = function (tank) {
                if (this.bullet._frameToShoot === 0) {
                    var bulletState = Object.assign({}, this.state);
                    switch (tank.onDirection) {
                        case 'RIGHT':
                            bulletState.x += this._height;
                            break;
                        case 'DOWN':
                            bulletState.y += this._height;
                            break;
                    }
                    var bullet = new Bullet(bulletState.x, bulletState.y, this.bullet.speed, tank.onDirection, this.bullet.color);
                    inDisplay.push(bullet);
                    this.bullet._frameToShoot = this.bullet.framePerBullet;
                }
            };
        }

        this.hit = function (obj) {
            console.log('Tank was hitten by: ', obj.type);
        };

        this.getHitBy = function () {
            return {type: 'TANK'};
        };

        this.rollBack = function () {
            this.x = this._prevX;
            this.y = this._prevY;
        };

        this.getState = function () {
            return this.body._state;
        };

        this._setState = function (newStateParam) {
            var newState = Object.assign({}, this.getState(), newStateParam);
            return newState;
        };

        this.update = function () {
            this.body.update();
            this.barrel.update();

            if (keyboard.left) {
                var newState = this._setState({x: this.getState().x - this.speed});
                this._prevX = this.x;
                this.x -= this.speed;
                this.onDirection = 'LEFT';
                return newState;

            } else if (keyboard.right) {
                var newState = this._setState({x: this.getState().x + this.speed});
                this._prevX = this.x;
                this.x += this.speed;
                this.onDirection = 'RIGHT';
                return newState;

            } else if (keyboard.up) {
                var newState = this._setState({y: this.getState().y - this.speed});
                this._prevY = this.y;
                this.y -= this.speed;
                this.onDirection = 'UP';
                return newState;

            } else if (keyboard.down) {
                var newState = this._setState({y: this.getState().y + this.speed});
                this._prevY = this.y;
                this.y += this.speed;
                this.onDirection = 'DOWN';
                return newState;
            }

            if (keyboard.space) {
                this.barrel.shoot(this);
            }
        }
    }