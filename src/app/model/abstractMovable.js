import {AbstractModel} from "./abstractModel";


export class AbstractMovable extends AbstractModel{
    constructor() {
        super();
        ['draw', 'hit', 'rollBack', 'update']
            .forEach(el => {
                    if (this[el] === undefined) {
                        throw new TypeError(`AbstractMovable model must overwrite '${el}' method`)
                    }
                }
            )
    }

    // draw(...args){
    //     if(this._stateChanged) {
    //         this.ondraw(...args);
    //         this._stateChanged = false;
    //     }
    // }
    //
    // clear(...args){
    //     if(this._stateChanged) {
    //         this.onclear(...args);
    //     }
    // }

}