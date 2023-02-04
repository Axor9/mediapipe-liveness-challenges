declare type ChallengeTypes = 'blink' | 'nose' | 'smile' | 'face'

declare type FaceHorizontal = 'CENTER' | 'RIGHT' | 'LEFT'
declare type FaceVertical = 'CENTER' | 'TOP' | 'BOTTOM'

declare interface Landmarks {
    faceLandmarks: Point[]
    noseLandmarks: Rect
    boundingBox: BoundingBox
    lipsLandmarks: Point[]
    leftEyeLandmarks: Point[]
    rightEyeLandmarks: Point[]
}

declare interface Point {
    x: number
    y: number
}

declare interface Rect {
    x: number
    y: number
    width: number
    height: number
}

declare interface BoundingBox {
    xMin: number
    xMax: number
    yMin: number
    yMax: number
}
