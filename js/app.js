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
    this.mousePosition = { x: e.offsetX, y: e.offsetY }
    if (this.isDriwing) {
      this.canvas.animationLine(this.mousePosition)
    }
  }

  onCancelCreateLine() {
    this.canvas.endDraw()
    this.isDriwing = false
  }

  onCollapseClick() {
    if (this.isAnimated) {
      return
    }
    if (this.canvas.allLine.length === 0) {
      return
    }
    this.isAnimated = true
    const intervalID = setInterval(() => {
      this.canvas.collapseAllLine()
      this.canvas.animationCounter -= 0.005
      this.canvas.drawAll()

      const arrStartDelete = this.canvas.checkEndLinePositionForPoint()
      arrStartDelete.forEach((point) => {
        point.collapseCircle(this.canvas.ctx)
      })

      if (this.canvas.animationCounter <= 0.0001) {
        this.canvas.clearArea()
        clearInterval(intervalID)
        this.isAnimated = false
        this.canvas.clearAllData()
        this.canvas.animationCounter = 1
      }
    }, 15)
  }

  onCanvasClick() {
    if (this.isAnimated) {
      return
    }
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
