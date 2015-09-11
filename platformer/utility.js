'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Angle = {
    radians: function radians(degrees) {
        return degrees * (Math.PI / 180) % Math.PI * 2;
    },
    degrees: function degrees(radians) {
        return radians * (180 / Math.PI) % 360;
    },
    angleDirection: function angleDirection(angle) {
        return new Vector2(Math.cos(angle), Math.sin(angle));
    }
};

var Vector2 = (function () {
    function Vector2(x, y) {
        _classCallCheck(this, Vector2);

        this.x = x || 0;
        this.y = y || 0;
    }

    _createClass(Vector2, [{
        key: "magnitude",
        value: function magnitude() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    }, {
        key: "normalize",
        value: function normalize() {
            var len = this.magnitude();
            if (len > 0) return new Vector2(this.x / len, this.y / len);
            return new Vector2();
        }
    }, {
        key: "dot",
        value: function dot(other) {
            return a.x * b.x + a.y * b.y;
        }
    }, {
        key: "add",
        value: function add(other) {
            var x = other.x || 0,
                y = other.y || 0;
            return new Vector2(this.x + x, this.y + y);
        }
    }, {
        key: "sub",
        value: function sub(other) {
            var x = other.x || 0,
                y = other.y || 0;
            return new Vector2(this.x - x, this.y - y);
        }
    }, {
        key: "mul",
        value: function mul(factor) {
            if (isNan(factor)) throw "Factor is not a number";
            return new Vector2(this.x * factor, this.y * factor);
        }
    }, {
        key: "div",
        value: function div(divisor) {
            if (isNan(divident)) throw "Dividend is not a number";
            if (divisor === 0) throw "Cannot divide by zero";

            return new Vector2(this.x / divisor, this.y / divisor);
        }
    }]);

    return Vector2;
})();

var Point2 = (function () {
    function Point2(x, y) {
        _classCallCheck(this, Point2);

        this.x = x || 0;
        this.y = y || 0;
    }

    _createClass(Point2, [{
        key: "distance",
        value: function distance(to) {
            var vector = this.direction(this, to);
            return vector.magnitude();
        }
    }, {
        key: "direction",
        value: function direction(to) {
            return new Vector2(to.x - this.x, to.y - this.y);
        }
    }]);

    return Point2;
})();