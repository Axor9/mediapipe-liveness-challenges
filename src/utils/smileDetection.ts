const smileRatio = 0.4

export const smileDetection = (
    lipsLandmarks: Point[],
    faceLandmarks: Point[]
) => {
    const lipsWidth = Math.abs(lipsLandmarks[10].x - lipsLandmarks[18].x)
    const faceWidth = Math.abs(faceLandmarks[27].x - faceLandmarks[9].x)
    const ratio = lipsWidth / faceWidth
    console.log(ratio)
    return ratio > smileRatio
}
