export class AbstractModel {
    constructor() {
        this.description = {
            type: '',
            haveHitBox: true
        };
    }

    updDescription(newParam){
        var descriptionKeys = Object.keys(this.description);
        for(var newParamKey in newParam){
            if(descriptionKeys.indexOf(newParamKey) === -1){
                throw new TypeError(`AbstractMovable.updDescription: key ${newParamKey} not in ${descriptionKeys}`)
            }
        }
        this.description = Object.assign(this.description, newParam);
    }

}