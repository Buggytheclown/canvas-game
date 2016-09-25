import {AbstractModel} from "./abstractModel";


export class AbstractUnmovable extends AbstractModel{
    constructor() {
        super();
        ['draw', 'hit']
            .forEach(el => {
                    if (this[el] === undefined) {
                        throw new TypeError(`AbstractUnmovable model must overwrite '${el}' method`)
                    }
                }
            )
    }

    update() {
        return null;
    };


}