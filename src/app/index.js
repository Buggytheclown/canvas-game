import {InDisplay} from "./model/display";
import {Tank} from "./model/tank";
import {Wall} from "./model/wall";
import {Keyboard} from "./keyboard";
import {Keybot} from "./keybot";
import {Animate} from "./model/animate";


class Main {
    context;
    canvas;
    inDisplay;

    constructor() {
        this.canvas = document.getElementById('game');
        this.context = this.canvas.getContext('2d');
        this.inDisplay = new InDisplay({x: this.canvas.width, y: this.canvas.height});
    }

    startGame() {
        this.initObjects()
            .then(success=>this.mainLoop(),
                error=>console.log('Error to init Objects'));
    }

    initObjects() {
        var spritePromise = new Promise(resolve => {
            var mainSprite = new Image();
            mainSprite.src = "assets/img/tiles.png";
            mainSprite.onload = ()=> {
                resolve(mainSprite);
            };
        });

        this.inDisplay.push(
            new Tank({
                inDisplay: this.inDisplay,
                driver: Keyboard(),
                drawer: new Animate({
                    context: this.context,
                    spritePromise: spritePromise,
                    onSpriteType: 1
                }),
                state: {x: 150, y: 150, w: 30, h: 30, speed: 5}
            }));

        this.inDisplay.push(new Wall(this.inDisplay, {x: 300, y: 100, w: 8, h: 200}, 'grey'));

        this.inDisplay.push(
            new Tank({
                inDisplay: this.inDisplay,
                driver: Keybot(),
                drawer: new Animate({
                    context: this.context,
                    spritePromise: spritePromise,
                    onSpriteType: 0
                }),
                state: {x: 200, y: 200, w: 30, h: 30, speed: 1}
            }));
        this.inDisplay.push(
            new Tank({
                inDisplay: this.inDisplay,
                driver: Keybot(),
                drawer: new Animate({
                    context: this.context,
                    spritePromise: spritePromise,
                    onSpriteType: 0
                }),
                state: {x: 150, y: 250, w: 30, h: 30, speed: 2}
            }));
        this.inDisplay.push(
            new Tank({
                inDisplay: this.inDisplay,
                driver: Keybot(),
                drawer: new Animate({
                    context: this.context,
                    spritePromise: spritePromise,
                    onSpriteType: 0
                }),
                state: {x: 450, y: 250, w: 30, h: 30, speed: 3}
            }));
        this.inDisplay.push(
            new Tank({
                inDisplay: this.inDisplay,
                driver: Keybot(),
                drawer: new Animate({
                    context: this.context,
                    spritePromise: spritePromise,
                    onSpriteType: 0
                }),
                state: {x: 550, y: 250, w: 30, h: 30, speed: 4}
            }));

        return Promise.all([spritePromise])
    }

    mainLoop() {
        this.inDisplay.update();
        this.inDisplay.draw(this.context);
        window.requestAnimationFrame(this.mainLoop.bind(this));
    }
}
var main = new Main();
window.addEventListener('load', main.startGame.bind(main));
