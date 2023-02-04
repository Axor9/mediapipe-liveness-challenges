const leftRatio = 5
const rightRatio = 0.5
const topRatio = 0.9
const bottomRatio = 1.4

export const faceLeftRight = (
    noseLandmark: Point,
    faceLandmarks: Point[]
): FaceHorizontal => {
    const rigthDistance = Math.abs(noseLandmark.x - faceLandmarks[27].x)
    const leftDistance = Math.abs(noseLandmark.x - faceLandmarks[9].x)
    const ratio = rigthDistance / leftDistance

    if (ratio > leftRatio) {
        return 'LEFT'
    }
    if (ratio < rightRatio) {
        return 'RIGHT'
    }

    return 'CENTER'
}

export const faceBottomTop = (
    noseLandmark: Point,
    faceLandmarks: Point[]
): FaceVertical => {
    const topDistance = Math.abs(noseLandmark.y - faceLandmarks[0].y)
    const bottomDistance = Math.abs(noseLandmark.y - faceLandmarks[18].y)
    const ratio = topDistance / bottomDistance

    if (ratio < topRatio) {
        return 'TOP'
    }
    if (ratio > bottomRatio) {
        return 'BOTTOM'
    }

    return 'CENTER'
}
