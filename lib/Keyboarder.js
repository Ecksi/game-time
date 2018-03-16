class Keyboarder {
  constructor() {
    this.key = {
      left: false,
      right: false,
      up: false,
      down: false
    }
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
  }

  keyDownHandler(e) {
    e.preventDefault()
    if (e.keyCode === 39) {
      this.key.right = true;
    } else if (e.keyCode === 37) {
      this.key.left = true;
    } else console.log('none')
  }

  keyUpHandler(e) {
    e.preventDefault()
    if (e.keyCode === 39) {
      this.key.right = false;
    } else if (e.keyCode === 37) {
      this.key.left = false;
    }
  }

  isDown(input) {
    return this.key[input];
  }  
}

module.exports = Keyboarder;