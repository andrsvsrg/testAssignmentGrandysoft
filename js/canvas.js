import { Line } from './line.js'
import { Circle } from './circle.js'

export class Canvas {
  constructor() {
    this.canvasArea = document.querySelector('.canvas')
    this.ctx = this.canvasArea.getContext('2d')
    this.ctx.globalAlpha = 1
    this.width = this.canvasArea.width
    this.height = this.canvasArea.height
    this.allLine = []
    this.allPoints = []
    this.currentPoints = []
    this.currentLine = {}
  }

  clearAllData() {
    this.allLine = []
    this.allPoints = []
    this.currentPoints = []
    this.currentLine = {}
  }

  drawAll() {
    this.clearArea()
    this.drawAllLine()
    this.drawCurrentPoints()
    this.drawPreviousPoints()
  }

  drawAllLine() {
    this.allLine.forEach((line) => this.drawLine(line))
  }

  drawLine({ startX, startY, endX, endY }) {
    this.ctx.beginPath()
    this.ctx.moveTo(startX, startY)
    this.ctx.lineTo(endX, endY)
    this.ctx.stroke()
  }

  clearArea() {
    this.ctx.clearRect(0, 0, this.width, this.height)
  }

  startDraw(mousePosition) {
    const { x, y } = mousePosition
    this.currentLine = new Line({ startX: x, startY: y })
    this.ctx.beginPath()
    this.ctx.moveTo(x, y)
  }

  endDraw(mousePosition) {
    if(!mousePosition) {
      this.currentLine = {}
      this.currentPoints = []
      this.clearArea()
      this.drawAllLine(this.allLine)
      this.drawPreviousPoints()
      return
    }
    const { x, y } = mousePosition
    this.currentLine.updateEndPosition(x,y)
    this.ctx.lineTo(this.currentLine.endX, this.currentLine.endY)
    this.ctx.stroke()
    this.allLine.push(this.currentLine)
    this.allPoints.push(...this.currentPoints)
  }

  drawCurrentPoints() {
    this.currentPoints.forEach(([x,y]) => {
      const point = new Circle({x,y})
      point.drawCircle(this.ctx)
    })
  }

  drawPreviousPoints() {
    this.allPoints.forEach(([x,y]) => {
      const point = new Circle({x,y})
      point.drawCircle(this.ctx)
    })
  }

  animationLine(mousePosition) {
    const { x, y } = mousePosition
    this.clearArea()
    this.drawAllLine()
    this.currentLine.updateEndPosition(x,y)
    if(this.allLine.length !== 0) {
      this.currentPoints = this.currentLine.getPositionIntersection(this.allLine)
      this.drawCurrentPoints()
      this.drawPreviousPoints()
    }
    this.drawLine(this.currentLine)
  }

}