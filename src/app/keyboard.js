export function Keyboard() {
    var keyboard = {
        left: false,
        up: false,
        right: false,
        down: false,
        space: false
    };

    window.onkeydown = function (e) {
        switch (e.keyCode) {
            //key A or LEFT
            case 65:
            case 37:
                keyboard.left = true;
                break;

            //key W or UP
            case 87:
            case 38:
                keyboard.up = true;
                break;

            //key D or RIGHT
            case 68:
            case 39:
                keyboard.right = true;
                break;

            //key S or DOWN
            case 83:
            case 40:
                keyboard.down = true;
                break;

            //key Space
            case 32:
            case 75:
                keyboard.space = true;
                break;
        }
        e.preventDefault();
    };

    window.onkeyup = function (e) {
        switch (e.keyCode) {
            //key A or LEFT
            case 65:
            case 37:
                keyboard.left = false;
                break;

            //key W or UP
            case 87:
            case 38:
                keyboard.up = false;
                break;

            //key D or RIGHT
            case 68:
            case 39:
                keyboard.right = false;
                break;

            //key S or DOWN
            case 83:
            case 40:
                keyboard.down = false;
                break;

            //key Space
            case 75:
            case 32:
                keyboard.space = false;
                break;
        }
        e.preventDefault();
    };

    return keyboard;
}