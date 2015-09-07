'use strict';

var Angle = {
    radians: function(degrees) {
        return degrees * (Math.PI / 180) % Math.PI * 2;
    },
    degrees: function(radians) {
        return radians * (180 / Math.PI) % 360;
    },
    angleDirection: function(angle) {
        return new Vector2(Math.cos(angle), Math.sin(angle));
    }
}

class Vector2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    magnitude() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    normalize() {
        let len = this.magnitude();
        if (len > 0)
            return new Vector2(this.x/len, this.y/len);
        return new Vector2();
    }

    dot(other) {
        return a.x*b.x + a.y*b.y;
    }

    add(other) {
        let x = other.x || 0,
            y = other.y || 0;
        return new Vector2(this.x+x, this.y+y);
    }

    sub(other) {
        let x = other.x || 0,
            y = other.y || 0;
        return new Vector2(this.x-x, this.y-y);
    }

    mul(factor) {
        if (isNan(factor)) throw "Factor is not a number";
        return new Vector2(this.x*factor, this.y*factor);
    }

    div(divisor) {
        if (isNan(divident)) throw "Dividend is not a number";
        if (divisor === 0) throw "Cannot divide by zero";

        return new Vector2(this.x/divisor, this.y/divisor);
    }
}

class Point2 {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }

    distance(to) {
        let vector = this.direction(this, to);
        return vector.magnitude();
    }

    direction(to) {
        return new Vector2(to.x-this.x, to.y-this.y);
    }
}