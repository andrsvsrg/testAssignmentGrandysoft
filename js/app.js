import { Canvas } from './canvas.js'

export class App {
  constructor() {
    this.canvas = new Canvas()
    this.button = document.querySelector('.collapse-block')
    this.mousePosition = { x: 0, y: 0 }
    this.isDriwing = false
    this.isAnimated = false
  }

  onUpdateMousePosition(e) {
    const positionX = e.clientX - 30 < 0 ? 0 : e.clientX - 30
    const positionY = e.clientY - 30 < 0 ? 0 : e.clientY - 30
    this.mousePosition = { x: positionX, y: positionY }
    if (this.isDriwing) {
      this.canvas.animationLine(this.mousePosition)
    }
  }

  onCancelCreateLine() {
    this.canvas.endDraw()
    this.isDriwing = false
  }

  onCollapseClick() {
    if(this.isAnimated) { return }
    if(this.canvas.allLine.length === 0) { return }
    this.isAnimated = true
    const intervalID = setInterval(() => {
      this.canvas.ctx.globalAlpha -= 0.01
      this.canvas.drawAll()
      if(this.canvas.ctx.globalAlpha <= 0.01) {
        this.canvas.ctx.globalAlpha = 0
        this.canvas.clearArea()
        clearInterval(intervalID)
        this.isAnimated = false
        this.canvas.clearAllData()
        this.canvas.ctx.globalAlpha = 1
      }
    }, 30)
  }

  onCanvasClick() {
    if (!this.isDriwing) {
      this.canvas.startDraw(this.mousePosition)
      this.isDriwing = true
    } else {
      this.canvas.endDraw(this.mousePosition)
      this.isDriwing = false
    }
  }

  addListeners() {
    this.button.addEventListener('click', this.onCollapseClick.bind(this))
    this.canvas.canvasArea.addEventListener('contextmenu', this.onCancelCreateLine.bind(this))
    this.canvas.canvasArea.addEventListener('mousemove', this.onUpdateMousePosition.bind(this))
    this.canvas.canvasArea.addEventListener('click', this.onCanvasClick.bind(this))
  }

  init() {
    this.addListeners()
  }
}



