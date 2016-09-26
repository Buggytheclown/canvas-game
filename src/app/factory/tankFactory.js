import {keyboard1} from "../drivers/keyboard1";
import {keyboard2} from "../drivers/keyboard2";
import {Keybot} from "../drivers/keybot";
import {Tank} from "../model/tank";
import {Gun} from "../model/gun";
import {StaticDrawer} from "../drawers/staticDrawer";
import {BoomAnimate} from "./boomAnimate";
import {DynamicDrawer} from "../drawers/dynamicDrawer";

export function tankFactory({type, inBlock, driverType, spritePromise}) {
    var driver;
    var owner;
    switch (driverType) {
        case 'PLAYER1':
            driver = keyboard1();
            owner = 'PLAYER1';
            break;
        case 'PLAYER2':
            driver = keyboard2();
            owner = 'PLAYER2';
            break;
        case 'BOT':
            driver = new Keybot();
            owner = 'BOT';
            break;
        default:
            throw new TypeError(`TankFactory got unexpected 'driverType': ${driverType}`);
            break;
    }
    var speed;
    switch (type) {
        case 'A':
            speed = 4;
            break;
        case 'B':
            speed = 3;
            break;
        case 'C':
            speed = 2;
            break;
        case 'D':
            speed = 1;
            break;
        default:
            throw new TypeError(`TankFactory got unexpected 'type': ${type}`);
            break;
    }

    return new Tank({
        driver,
        gun: new Gun(new StaticDrawer({spritePromise}), new BoomAnimate(spritePromise), 11 - speed*1.5),
        rollBackDrawer: new BoomAnimate(spritePromise),
        drawer: new DynamicDrawer({
            spritePromise: spritePromise,
            onSpriteType: driverType === 'BOT' ? 0 : 1
        }),
        state: {x: inBlock[0] * 40, y: inBlock[1] * 40, w: 30, h: 30, speed: speed, owner}
    })
}