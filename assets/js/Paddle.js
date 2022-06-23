const SPEED = 0.02;

export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
    this.reset();
  }

  // Getting '--position' variable from css
  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue("--position")
    );
  }

  // Setting value of '--position' variable
  set position(value) {
    this.paddleElem.style.setProperty("--position", value);
  }

  // Paddle rect
  rect() {
    return this.paddleElem.getBoundingClientRect();
  }

  // Reset position
  reset() {
    this.position = 50;
  }

  // Paddle update method
  update(delta, ballHeight) {
    this.position += SPEED * delta * (ballHeight - this.position);
  }
}
