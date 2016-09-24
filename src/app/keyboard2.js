export function keyboard2() {
    var keyboard = {
        left: false,
        up: false,
        right: false,
        down: false,
        space: false,
        rollBack:()=>{}
    };

    window.addEventListener('keydown',function (e) {
        switch (e.keyCode) {
            //key A or LEFT
            case 37:
                keyboard.left = true;
                break;

            //key W or UP
            case 38:
                keyboard.up = true;
                break;

            //key D or RIGHT
            case 39:
                keyboard.right = true;
                break;

            //key S or DOWN
            case 40:
                keyboard.down = true;
                break;

            //key Space
            case 75:
            case 96:
                keyboard.space = true;
                break;
        }
        e.preventDefault();
    });

    window.addEventListener('keyup',function (e) {
        switch (e.keyCode) {
            //key A or LEFT
            case 37:
                keyboard.left = false;
                break;

            //key W or UP
            case 38:
                keyboard.up = false;
                break;

            //key D or RIGHT
            case 39:
                keyboard.right = false;
                break;

            //key S or DOWN
            case 40:
                keyboard.down = false;
                break;

            //key Space
            case 75:
            case 96:
                keyboard.space = false;
                break;
        }
        e.preventDefault();
    });

    return keyboard;
}