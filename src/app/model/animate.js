import {AbstractUnmovable} from "./abstractUnmovable";

export class Animate extends AbstractUnmovable {
    context;
    mainSprite;
    onImgStep = 0;
    tickPerFrame = 5;
    currentTick = 0;

    constructor(context) {
        super();
        this.context = context;
        this.mainSprite = new Image();
        this.mainSprite.src = "assets/img/tiles.png";

        this.imgOnSpriteXYWH = [676, 34, 24, 30];

        this.imgOnCanvasXYWH = [150, 150, 25, 30];

    }

    hit() {
        return null;
    }

    draw(onDirection) {
        var newState = [this.imgOnSpriteXYWH[0] - this.onImgStep * 32, ...this.imgOnSpriteXYWH.slice(1, 4)];

        this.context.clearRect(...this.imgOnCanvasXYWH);
        this.context.drawImage(this.mainSprite, ...newState, ...this.imgOnCanvasXYWH);

        if (this.currentTick % this.tickPerFrame === 0) {
            this.onImgStep === 6 ? this.onImgStep = 0 : this.onImgStep++;
            this.currentTick = 0;
        }
        this.currentTick++;
    }


}