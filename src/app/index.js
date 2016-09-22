import {InDisplay} from "./model/display";
import {Tank} from "./model/tank";
import {Wall} from "./model/wall";
import {Keyboard} from "./keyboard";


class Main {
    context;
    interval;
    canvas;
    inDisplay;

    constructor() {
        this.canvas = document.getElementById('game');
        this.context = this.canvas.getContext('2d');
        this.inDisplay = new InDisplay({x: this.canvas.width, y: this.canvas.height});
    }

    startGame() {
        this.initObjects();
        this.mainLoop();
        // window.requestAnimationFrame(this.mainLoop.bind(this));
        // this.interval = setInterval(this.mainLoop.bind(this), 15);
        // for (let i = 0; i < 50; i++) {
        //     setTimeout(this.mainLoop.bind(this), 150)
        // }
    }

    initObjects() {
        var keyboard = Keyboard();
        this.inDisplay.push(new Wall(this.inDisplay, 400, 40, 300, 8, 'black'));
        this.inDisplay.push(new Tank(this.inDisplay, keyboard));
    }

    mainLoop() {
        this.inDisplay.update();
        this.inDisplay.clear(this.context);
        this.inDisplay.draw(this.context);
        window.requestAnimationFrame(this.mainLoop.bind(this));
    }
}
var main = new Main();
window.addEventListener('load', main.startGame.bind(main));
