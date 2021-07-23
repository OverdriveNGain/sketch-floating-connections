class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h
    }

    intersectsWithRect(rect) {
        return ((this.rect.x - rect.x) > ((this.rect.w + rect.w) * 0.5)) &&
            ((this.rect.y - rect.y) > ((this.rect.h + rect.h) * 0.5));
    }

    containsPoint(point) {
        if (Math.abs(point.x - this.x) > this.w * 0.5) {
            return false;
        }
        if (Math.abs(point.y - this.y) > this.h * 0.5) {
            return false;
        }
        return true;
    }
}