import {GameEngine} from "./gameEngine";
import {Tank} from "./model/tank";
import {Wall} from "./model/wall";
import {keyboard1} from "./drivers/keyboard1";
import {Keybot} from "./drivers/keybot";
import {DynamicDrawer} from "./drawers/dynamicDrawer";
import {Gun} from "./model/gun";
import {keyboard2} from "./drivers/keyboard2";
import {StaticDrawer} from "./drawers/staticDrawer";
import {BoomAnimate} from "./factory/boomAnimate";
import {StaticOnStageDrawer} from "./drawers/staticOnStageDrawer";
import {tankFactory} from "./factory/tankFactory";
import {wallFactory} from "./factory/wallFactory";


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
        var map1 = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 'UNKN', 'UNKN', 'UNKN', 'UNKN', 'UNKN', 0, 0, 'UNKN', 'UNKN', 'UNKN', 0, 0, 'UNKN', 'UNKN', 'UNKN', 'UNKN', 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ['BROWN', 'BROWN', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'BROWN', 'BROWN'],
            ['BROWN', 'BROWN', 0, 0, 0, 0, 'GREY', 'GREY', 'GREY', 'GREY', 'GREY', 'GREY', 'GREY', 'GREY', 'GREY', 0, 0, 0, 'BROWN', 'BROWN'],
            ['BROWN', 'BROWN', 0, 0, 0, 0, 'GREY', 'GREY', 'GREY', 'GREY', 'GREY', 'GREY', 'GREY', 'GREY', 'GREY', 0, 0, 0, 'BROWN', 'BROWN'],
            ['BROWN', 'BROWN', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'BROWN', 'BROWN'],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 'WHITE', 'WHITE', 'WHITE', 'WHITE', 'WHITE', 0, 0, 'WHITE', 'WHITE', 'WHITE', 0, 0, 'WHITE', 'WHITE', 'WHITE', 'WHITE', 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, , 0, 'EAGL', 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        map1.forEach((row, irow)=>row.forEach((col, icol)=> {
            if (col) {
                this.gameEngine.push(wallFactory({type: col, inBlock: [icol, irow], spritePromise}));
            }
        }));

            [
            tankFactory({type: 'B', inBlock: [5, 13], driverType: 'PLAYER1', spritePromise}),
            tankFactory({type: 'B', inBlock: [15, 13], driverType: 'PLAYER2', spritePromise})


            ].forEach(el=>this.gameEngine.push(el));

        if (1) {
            [
                tankFactory({type: 'B', inBlock: [5, 1], driverType: 'BOT', spritePromise}),
                tankFactory({type: 'C', inBlock: [10, 1], driverType: 'BOT', spritePromise}),
                tankFactory({type: 'D', inBlock: [15, 1], driverType: 'BOT', spritePromise}),
                tankFactory({type: 'D', inBlock: [5, 2], driverType: 'BOT', spritePromise}),
                tankFactory({type: 'C', inBlock: [10, 2], driverType: 'BOT', spritePromise}),
                tankFactory({type: 'B', inBlock: [15, 2], driverType: 'BOT', spritePromise})
            ].forEach(el=>this.gameEngine.push(el));
        }


        return Promise.all([spritePromise]);
    }

    mainLoop() {
        if (window.playGame) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.gameEngine.update();
            this.gameEngine.draw();
        }

        window.requestAnimationFrame(this.mainLoop.bind(this));
    }
}
var main = new Main();
window.addEventListener('load', main.startGame.bind(main));
