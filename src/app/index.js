import {InDisplay} from "./model/display";
import {Tank} from "./model/tank";
import {Wall} from "./model/wall";
import {Keyboard} from "./keyboard";
import {Keybot} from "./model/keybot";
import {Animate} from "./model/animate";


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
    }

    initObjects() {
        // this.inDisplay.push(new Tank(this.inDisplay, Keyboard(), {x: 150, y: 150, w:30, h:30, color:'green', speed:5}));
        // this.inDisplay.push(new Wall(this.inDisplay, {x:300, y:100, w:8, h:200}, 'black'));


        this.inDisplay.push(new Animate(this.context));
        // this.inDisplay.push(new Tank(this.inDisplay, Keybot(), {x: 200, y: 200, w:30, h:30, color:'red', speed:3}));
        // this.inDisplay.push(new Tank(this.inDisplay, Keybot(), {x: 150, y: 250, w:30, h:30, color:'yellow', speed:3}));
        // this.inDisplay.push(new Tank(this.inDisplay, Keybot(), {x: 450, y: 250, w:30, h:30, color:'purple', speed:3}));
        // this.inDisplay.push(new Tank(this.inDisplay, Keybot(), {x: 550, y: 250, w:30, h:30, color:'purple', speed:3}));



    }

    mainLoop() {
        this.inDisplay.update();
        this.inDisplay.draw(this.context);
        window.requestAnimationFrame(this.mainLoop.bind(this));
    }
}
var main = new Main();
window.addEventListener('load', main.startGame.bind(main));
