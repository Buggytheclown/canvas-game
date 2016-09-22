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
        this.inDisplay = new InDisplay();
    }

    startGame() {
        this.initObjects();
        this.mainLoop();
        // this.interval = setInterval(this.mainLoop, 20);
    }

    initObjects() {
        var keyboard = Keyboard();
        this.inDisplay.push(new Wall(this.inDisplay, 400, 40, 300, 8, 'black'));
        // this.inDisplay.push(new Tank(this.inDisplay, keyboard));
    }

    mainLoop() {
        this.inDisplay.clear(this.context);
        this.inDisplay.update();
        this.inDisplay.draw(this.context);
    }
}
var main = new Main();
window.addEventListener('load', main.startGame.bind(main));
