export class Line {
  constructor(options) {
    this.startX = options.startX
    this.startY = options.startY
    this.endX = options.endX
    this.endY = options.endY
    this.fullLengthLine = 0
  }

  updateEndPosition(endX, endY) {
    this.endX = endX
    this.endY = endY
  }

  getPositionIntersection(allLine) {
    const x1 = this.startX
    const y1 = this.startY
    const x2 = this.endX
    const y2 = this.endY
    const points = []

    allLine.forEach((line) => {
      const { startX: x3, startY: y3, endX: x4, endY: y4 } = line
      const x = ((x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4))
      const y = ((x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4)) / ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4))
      if (isNaN(x) || isNaN(y)) {
        return false
      } else {
        if (x1 >= x2) {
          if (!(x2 <= x && x <= x1)) {
            return false
          }
        } else {
          if (!(x1 <= x && x <= x2)) {
            return false
          }
        }
        if (y1 >= y2) {
          if (!(y2 <= y && y <= y1)) {
            return false
          }
        } else {
          if (!(y1 <= y && y <= y2)) {
            return false
          }
        }
        if (x3 >= x4) {
          if (!(x4 <= x && x <= x3)) {
            return false
          }
        } else {
          if (!(x3 <= x && x <= x4)) {
            return false
          }
        }
        if (y3 >= y4) {
          if (!(y4 <= y && y <= y3)) {
            return false
          }
        } else {
          if (!(y3 <= y && y <= y4)) {
            return false
          }
        }
      }
      points.push([x, y])
    })

    return points
  }

  getFullLengthLine() {
    if (this.startX && this.startY && this.endX && this.endY) {
      const fullLine = Math.sqrt(Math.pow((this.endX - this.startX), 2) + Math.pow((this.endY - this.startY), 2))  // d2= (х2— х1)2+ (y2— y1)2.
      this.fullLengthLine = fullLine
    }
  }

  decreaseLine() {
    const totalPartLine = 200
    const cutLengthFromLine = this.fullLengthLine / (totalPartLine / 2)
    return cutLengthFromLine
  }

  getNextPointPosition() {
    this.getFullLengthLine()
    const decreaseLength = this.decreaseLine()
    const k = decreaseLength / this.fullLengthLine

    const newStartX = this.startX + (this.endX - this.startX) * k
    const newStartY = this.startY + (this.endY - this.startY) * k

    const newEndX = this.endX + (this.startX - this.endX) * k
    const newEndY = this.endY + (this.startY - this.endY) * k

    return [newStartX, newStartY, newEndX, newEndY]
  }

  collapseLine() {
    const [newStartX, newStartY, newEndX, newEndY] = this.getNextPointPosition()
    this.startX = newStartX
    this.startY = newStartY
    this.endX = newEndX
    this.endY = newEndY
  }
}