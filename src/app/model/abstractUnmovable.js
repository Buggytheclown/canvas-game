export class AbstractUnmovable {
    constructor() {
        ['draw', 'hit']
            .forEach(el => {
                    if (this[el] === undefined) {
                        throw new TypeError(`AbstractUnmovable model must overwrite '${el}' method in ${/^function\s+([\w\$]+)\s*\(/.exec( this.toString() )}`)
                    }
                }
            )
    }

    update() {
        return null;
    };


}