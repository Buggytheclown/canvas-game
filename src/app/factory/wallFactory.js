import {StaticOnStageDrawer} from "../drawers/staticOnStageDrawer";
import {Wall} from "../model/wall";


export function wallFactory({type, inBlock, spritePromise}) {
    var TYPES = {
        WHITE: {
            xywh_0: [320, 32, 32, 32],
            xywh_1: [288, 224, 32, 32],
            xywh_2: [320, 224, 32, 32],
            xywh_3: [352, 224, 32, 32]
        },
        UNKN: {
            xywh_0: [64, 96, 32, 32],
            xywh_1: [288, 256, 32, 32],
            xywh_2: [320, 256, 32, 32],
            xywh_3: [352, 256, 32, 32],
        },
        BROWN:{
            xywh_0: [352, 32, 32, 32],
            xywh_1: [0, 256, 32, 32],
            xywh_2: [32, 256, 32, 32],
            xywh_3: [64, 256, 32, 32],
        },
        GREY: {
            xywh_0: [288, 32, 32, 32],
            xywh_1: [0, 320, 32, 32],
            xywh_2: [32, 320, 32, 32],
            xywh_3: [64, 320, 32, 32],
        },
        EAGL: {
            xywh_0: [1, 67, 30, 26],
            xywh_1: [35, 69, 24, 24],
            xywh_2: [35, 69, 24, 24],
            xywh_3: [35, 69, 24, 24],
        }
    };


    return new Wall({
        state: {x: inBlock[0] * 40, y: inBlock[1] * 40, w: 40, h: 40},
        drawer: new StaticOnStageDrawer({spritePromise, onSpritePosition: TYPES[type]}),
    })
}