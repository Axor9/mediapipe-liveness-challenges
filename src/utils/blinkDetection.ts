const umbral = 0.1

export const blinkDetection = (
    coordLeftEye: Point[],
    coordRightEye: Point[]
): boolean => {
    let earLeftEye = 0
    let earRightEye = 0

    if (coordLeftEye.length > 0) {
        earLeftEye = ratio(coordLeftEye)
    }

    if (coordRightEye.length > 0) {
        earRightEye = ratio(coordRightEye)
    }

    const ear = (earLeftEye + earRightEye) / 2

    return ear != 0 && ear < umbral
}

export const leftBlink = (
    coordLeftEye: Point[],
    coordRightEye: Point[]
): boolean => {
    let leftEye = 0
    let rightEye = 0

    if (coordLeftEye.length > 0) {
        leftEye = ratio(coordLeftEye)
    }

    if (coordRightEye.length > 0) {
        rightEye = ratio(coordRightEye)
    }

    return (
        leftEye != 0 && leftEye < umbral && rightEye > umbral && rightEye != 0
    )
}

export const rightBlink = (
    coordLeftEye: Point[],
    coordRightEye: Point[]
): boolean => {
    let leftEye = 0
    let rightEye = 0

    if (coordLeftEye.length > 0) {
        leftEye = ratio(coordLeftEye)
    }

    if (coordRightEye.length > 0) {
        rightEye = ratio(coordRightEye)
    }

    return (
        rightEye != 0 && rightEye < umbral && leftEye > umbral && leftEye != 0
    )
}

const ratio = (coordenate: Point[]) => {
    const d_A = coordenate[1].y - coordenate[5].y
    const d_B = coordenate[2].y - coordenate[4].y
    const d_C = coordenate[0].x - coordenate[3].x

    return (d_A + d_B) / (2 * d_C)
}
