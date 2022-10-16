export class Circle {
  constructor(options) {
    this.x = options.x
    this.y = options.y
    this.defaultRadius = 4
  }

  collapseCircle(ctx) {
    if (this.defaultRadius === 0) {
      return
    }
    this.defaultRadius -= 4
  }

  drawCircle(ctx) {
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.arc(this.x, this.y, this.defaultRadius, 0, Math.PI * 2, true)
    ctx.fillStyle = '#ff0000'
    ctx.fill()
  }
}