//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
class QuadTree {
    constructor(capacity, rect) {
        this.capacity = capacity;
        this.rect = rect;
        this.points = [];
        this.hasDivisions = false;
    }

    query(rect, arr) {
        for (let point of this.points) {
            if (rect.containsPoint(point))
                arr.push(point);
        }
        if (this.hasDivisions) {
            this.nw.query(rect, arr);
            this.ne.query(rect, arr);
            this.sw.query(rect, arr);
            this.se.query(rect, arr);
        }
    }

    insert(qt) {
        if (!this.rect.containsPoint(qt))
            return false

        if (this.points.length < this.capacity) {
            this.points.push(qt);
            return true;
        }
        else {

            if (!this.hasDivisions) {
                this.hasDivisions = true;
                this.nw = new QuadTree(this.capacity, new Rect(this.rect.x - this.rect.w * 0.25, this.rect.y - this.rect.h * 0.25, this.rect.w * 0.5, this.rect.h * 0.5));
                this.ne = new QuadTree(this.capacity, new Rect(this.rect.x + this.rect.w * 0.25, this.rect.y - this.rect.h * 0.25, this.rect.w * 0.5, this.rect.h * 0.5));
                this.sw = new QuadTree(this.capacity, new Rect(this.rect.x - this.rect.w * 0.25, this.rect.y + this.rect.h * 0.25, this.rect.w * 0.5, this.rect.h * 0.5));
                this.se = new QuadTree(this.capacity, new Rect(this.rect.x + this.rect.w * 0.25, this.rect.y + this.rect.h * 0.25, this.rect.w * 0.5, this.rect.h * 0.5));
            }

            if (!this.nw.insert(qt))
                if (!this.ne.insert(qt))
                    if (!this.sw.insert(qt))
                        this.se.insert(qt)
            return true;
        }
    }
}