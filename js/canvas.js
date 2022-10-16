import { Line } from './line.js'
import { Circle } from './circle.js'

export class Canvas {
  constructor() {
    this.canvasArea = document.querySelector('.canvas')
    this.ctx = this.canvasArea.getContext('2d')
    this.animationCounter = 1
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

  checkEndLinePositionForPoint() {
    const deletePoint = new Set()

    this.allLine.some(({ startX, startY, endX, endY }) => {

      this.allPoints.some((point) => {
        const { x, y } = point
        const minMaxX = [Math.floor(x - 3), Math.floor(x + 3)]
        const minMaxY = [Math.floor(y - 3), Math.floor(y + 3)]

        const conditionStartPoint = !!(minMaxX[0] < Math.floor(startX) && Math.floor(startX) < minMaxX[1] && minMaxY[0] < Math.floor(startY) && Math.floor(startY) < minMaxY[1])
        const conditionEndPoint = !!(minMaxX[0] < Math.floor(endX) && Math.floor(endX) < minMaxX[1] && minMaxY[0] < Math.floor(endY) && Math.floor(endY) < minMaxY[1])

        if (conditionStartPoint || conditionEndPoint) {
          deletePoint.add(point)
        }
      })
    })

    return deletePoint
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

  collapseAllLine() {
    this.allLine.forEach((line) => {
      line.collapseLine()
    })
  }

  endDraw(mousePosition) {
    if (!mousePosition) {
      this.currentLine = {}
      this.currentPoints = []
      this.clearArea()
      this.drawAllLine(this.allLine)
      this.drawPreviousPoints()
      return
    }
    const { x, y } = mousePosition
    this.currentLine.updateEndPosition(x, y)
    this.allLine.push(this.currentLine)
    this.allPoints.push(...this.currentPoints)
  }

  drawCurrentPoints() {
    this.currentPoints.forEach((point) => {
      point.drawCircle(this.ctx)
    })
  }

  drawPreviousPoints() {
    this.allPoints.forEach((point) => {
      point.drawCircle(this.ctx)
    })
  }

  animationLine(mousePosition) {
    const { x, y } = mousePosition
    this.clearArea()
    this.drawAllLine()
    this.currentLine.updateEndPosition(x, y)
    this.drawLine(this.currentLine)
    if (this.allLine.length !== 0) {
      const arrPoints = this.currentLine.getPositionIntersection(this.allLine)
      this.currentPoints = []
      arrPoints.forEach((point) => {
        this.currentPoints.push(new Circle({ x: point[0], y: point[1] }))
      })
      this.drawPreviousPoints()
      this.drawCurrentPoints()
    }
  }
}