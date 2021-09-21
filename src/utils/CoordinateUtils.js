import {FIELD_HEIGHT, FIELD_WIDTH} from "./Constants";

export const toX = (left) => {
    return (left / FIELD_WIDTH) * 2 - 1;
}

export const toY = (top) => {
    return 1 - (top / FIELD_HEIGHT) * 2;
}

export const toXY = (left, top) => {
    return [toX(left), toY(top)];
}

export const toLeft = (x) => {
    return (x + 1) / 2 * FIELD_WIDTH;
}

export const toTop = (y) => {
    return (1 - y) / 2 * FIELD_HEIGHT;
}

export const toLeftTop = (x, y) => {
    return [toLeft(x), toTop(y)];
}