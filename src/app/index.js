import {GameEngine} from "./gameEngine";
import {Tank} from "./model/tank";
import {Wall} from "./model/wall";
import {keyboard1} from "./control/keyboard1";
import {Keybot} from "./control/keybot";
import {DynamicDrawer} from "./drawers/dynamicDrawer";
import {Gun} from "./model/gun";
import {keyboard2} from "./control/keyboard2";
import {StaticDrawer} from "./drawers/staticDrawer";
import {OnHitWall} from "./factory/onHitWall";
import {StaticOnStageDrawer} from "./drawers/staticOnStageDrawer";


class Main {
    context;
    canvas;
    gameEngine;

    constructor() {
        window.playGame = true;
        this.canvas = document.getElementById('game');
        this.context = this.canvas.getContext('2d');
        this.gameEngine = new GameEngine(this.context, {x: this.canvas.width, y: this.canvas.height});
    }

    startGame() {
        this.initObjects()
            .then(success=>this.mainLoop(),
                error=>console.log('Error to init Objects: ', error));
    }

    initObjects() {
        var spritePromise = new Promise(resolve => {
            var mainSprite = new Image();
            mainSprite.src = "assets/img/tiles.png";
            mainSprite.onload = ()=> {
                resolve(mainSprite);
            };
        });

        this.gameEngine.push(
            new Tank({
                gameEngine: this.gameEngine,
                driver: keyboard1(),
                gun: new Gun(this.gameEngine, new StaticDrawer({spritePromise}), new OnHitWall(this.gameEngine, spritePromise)),
                drawer: new DynamicDrawer({
                    spritePromise: spritePromise,
                    onSpriteType: 1
                }),
                state: {x: 100, y: 400, w: 30, h: 30, speed: 5}
            }));

        this.gameEngine.push(
            new Tank({
                gameEngine: this.gameEngine,
                driver: keyboard2(),
                gun: new Gun(this.gameEngine, new StaticDrawer({spritePromise}), new OnHitWall(this.gameEngine, spritePromise)),
                drawer: new DynamicDrawer({
                    spritePromise: spritePromise,
                    onSpriteType: 1
                }),
                state: {x: 190, y: 400, w: 30, h: 30, speed: 5}
            }));

        this.gameEngine.push(
            new Wall({
                gameEngine: this.gameEngine,
                state: {x: 300, y: 100, w: 40, h: 40},
                drawer: new StaticOnStageDrawer({spritePromise}),
            })
        );
        this.gameEngine.push(
            new Wall({
                gameEngine: this.gameEngine,
                state: {x: 340, y: 100, w: 40, h: 40},
                drawer: new StaticOnStageDrawer({spritePromise}),
            })
        );
        this.gameEngine.push(
            new Wall({
                gameEngine: this.gameEngine,
                state: {x: 300, y: 140, w: 40, h: 40},
                drawer: new StaticOnStageDrawer({spritePromise}),
            })
        );
        this.gameEngine.push(
            new Wall({
                gameEngine: this.gameEngine,
                state: {x: 340, y: 140, w: 40, h: 40},
                drawer: new StaticOnStageDrawer({spritePromise}),
            })
        );


        this.gameEngine.push(
            new Wall({
                gameEngine: this.gameEngine,
                state: {x: 300, y: 280, w: 40, h: 40},
                drawer: new StaticOnStageDrawer({spritePromise}),
            })
        );
        this.gameEngine.push(
            new Wall({
                gameEngine: this.gameEngine,
                state: {x: 340, y: 280, w: 40, h: 40},
                drawer: new StaticOnStageDrawer({spritePromise}),
            })
        );


        this.gameEngine.push(
            new Wall({
                gameEngine: this.gameEngine,
                state: {x: 300, y: 500, w: 40, h: 40},
                drawer: new StaticOnStageDrawer({spritePromise}),
            })
        );
        this.gameEngine.push(
            new Wall({
                gameEngine: this.gameEngine,
                state: {x: 340, y: 500, w: 40, h: 40},
                drawer: new StaticOnStageDrawer({spritePromise}),
            })
        );
        this.gameEngine.push(
            new Wall({
                gameEngine: this.gameEngine,
                state: {x: 300, y: 540, w: 40, h: 40},
                drawer: new StaticOnStageDrawer({spritePromise}),
            })
        );
        this.gameEngine.push(
            new Wall({
                gameEngine: this.gameEngine,
                state: {x: 340, y: 540, w: 40, h: 40},
                drawer: new StaticOnStageDrawer({spritePromise}),
            })
        );


        if (1) {
            this.gameEngine.push(
                new Tank({
                    gameEngine: this.gameEngine,
                    driver: new Keybot(),
                    gun: new Gun(this.gameEngine, new StaticDrawer({spritePromise}), new OnHitWall(this.gameEngine, spritePromise)),
                    drawer: new DynamicDrawer({
                        spritePromise: spritePromise,
                        onSpriteType: 0
                    }),
                    state: {x: 200, y: 200, w: 30, h: 30, speed: 1}
                }));
            this.gameEngine.push(
                new Tank({
                    gameEngine: this.gameEngine,
                    driver: new Keybot(),
                    gun: new Gun(this.gameEngine, new StaticDrawer({spritePromise}), new OnHitWall(this.gameEngine, spritePromise)),
                    drawer: new DynamicDrawer({
                        spritePromise: spritePromise,
                        onSpriteType: 0
                    }),
                    state: {x: 150, y: 250, w: 30, h: 30, speed: 2}
                }));
            this.gameEngine.push(
                new Tank({
                    gameEngine: this.gameEngine,
                    driver: new Keybot(),
                    gun: new Gun(this.gameEngine, new StaticDrawer({spritePromise}), new OnHitWall(this.gameEngine, spritePromise)),
                    drawer: new DynamicDrawer({
                        spritePromise: spritePromise,
                        onSpriteType: 0
                    }),
                    state: {x: 450, y: 250, w: 30, h: 30, speed: 3}
                }));
            this.gameEngine.push(
                new Tank({
                    gameEngine: this.gameEngine,
                    driver: new Keybot(),
                    gun: new Gun(this.gameEngine, new StaticDrawer({spritePromise}), new OnHitWall(this.gameEngine, spritePromise)),
                    drawer: new DynamicDrawer({
                        spritePromise: spritePromise,
                        onSpriteType: 0
                    }),
                    state: {x: 550, y: 250, w: 30, h: 30, speed: 4}
                }));
        }

        return Promise.all([spritePromise]);
    }

    mainLoop() {
        if (window.playGame) {
            this.gameEngine.update();
            this.gameEngine.draw();
        }

        window.requestAnimationFrame(this.mainLoop.bind(this));
    }
}
var main = new Main();
window.addEventListener('load', main.startGame.bind(main));
