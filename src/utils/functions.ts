import { Results } from '@mediapipe/face_mesh'

export const boundingBox = (results: Results): BoundingBox => {
    let cx_min = results.image.width
    let cy_min = results.image.height
    let cx_max = 0
    let cy_max = 0

    for (const landmark of results.multiFaceLandmarks[0]) {
        const cx = landmark.x * results.image.width
        const cy = landmark.y * results.image.height

        if (cx < cx_min) {
            cx_min = cx
        }
        if (cy < cy_min) {
            cy_min = cy
        }
        if (cx > cx_max) {
            cx_max = cx
        }
        if (cy > cy_max) {
            cy_max = cy
        }
    }
    return {
        xMin: cx_min,
        xMax: cx_max,
        yMin: cy_min,
        yMax: cy_max,
    } as BoundingBox
}

export const checkInsideArea = (area: Rect, landmarks: Point[]): boolean => {
    if (landmarks.length == 0) return false

    for (const landmark of landmarks) {
        const point: Rect = {
            x: landmark.x,
            y: landmark.y,
            width: 0,
            height: 0,
        }
        if (!contains(area, point)) {
            return false
        }
    }
    return true
}

export const contains = (rect1: Rect, rect2: Rect) => {
    return (
        rect1.x <= rect2.x &&
        rect1.y <= rect2.y &&
        rect1.x + rect1.width >= rect2.x + rect2.width &&
        rect1.y + rect1.height >= rect2.y + rect2.height
    )
}

export const checkDistanceArea = (area: Rect, box: BoundingBox): boolean => {
    const distanceCenter = pointsDistance(
        area.x,
        area.y,
        area.x + area.width / 2,
        area.y + area.height / 2
    )
    const distanceTopLeft = pointsDistance(area.x, area.y, box.xMin, box.yMin)
    const distanceTopRight = pointsDistance(
        area.x + area.width,
        area.y,
        box.xMax,
        box.yMin
    )
    const distanceBottomLeft = pointsDistance(
        area.x,
        area.y + area.height,
        box.xMin,
        box.yMax
    )
    const distanceBottomRight = pointsDistance(
        area.x + area.width,
        area.y + area.height,
        box.xMax,
        box.yMax
    )

    const ratio =
        (distanceTopLeft +
            distanceTopRight +
            distanceBottomLeft +
            distanceBottomRight) /
        (4 * distanceCenter)

    return ratio < 0.4
}

export const pointsDistance = (
    x: number,
    y: number,
    x2: number,
    y2: number
) => {
    const a = x - x2
    const b = y - y2

    return Math.sqrt(a * a + b * b)
}
