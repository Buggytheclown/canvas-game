export class AbstractMovable {
    constructor() {
        ['draw', 'hit', 'getHitBy', 'rollBack', 'update']
            .forEach(el => {
                    if (this[el] === undefined) {
                        throw new TypeError(`AbstractMovable model must overwrite '${el}' method in ${this}`)
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