export class Circle {
  constructor(options) {
    this.x = options.x
    this.y = options.y
  }

  drawCircle(ctx) {
    ctx.beginPath()
    ctx.moveTo(this.x,this.y);
    ctx.arc(this.x , this.y,4,0,Math.PI*2,true)
    ctx.fillStyle = '#ff0000'
    ctx.fill()
  }
}