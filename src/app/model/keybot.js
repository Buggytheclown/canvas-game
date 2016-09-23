export function Keybot() {

    var keyboard = {
        left: false,
        up: false,
        right: false,
        down: false,
        space: false
    };

    setInterval(()=> {
        var keys = Object.keys(keyboard);
        var rndKey = keys[Math.floor(Math.random() * 4)];
        for (let key in keyboard) {
            keyboard[key] = key === rndKey;
        }
    }, 250);

    return keyboard;
}