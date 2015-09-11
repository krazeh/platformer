'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Engine = (function () {
    function Engine() {
        _classCallCheck(this, Engine);

        this.lastFrameTimeMs = 0;
        this.maxFPS = 60;
        this.delta = 0;
        this.timestep = 1000 / 60;
        this.fps = 60;
        this.framesThisSecond = 0;
        this.lastFPSUpdate = 0;
        this.started = false;
        this.frameID = null;
        this.maxSkipMs = 0.01;
        this.fpsDisplay = document.getElementById("fps"), this.states = [], this.canvas = document.getElementById("myCanvas"), this.context = this.canvas.getContext("2d");
    }

    _createClass(Engine, [{
        key: "update",
        value: function update(delta) {}
    }, {
        key: "mainLoop",
        value: (function (_mainLoop) {
            function mainLoop(_x) {
                return _mainLoop.apply(this, arguments);
            }

            mainLoop.toString = function () {
                return _mainLoop.toString();
            };

            return mainLoop;
        })(function (timestamp) {
            if (timestamp - lastFrameTimeMs <= maxSkipMs) {
                frameID = requestAnimationFrame(mainLoop);
                return;
            }

            var currentState = this.states.slice(-1);
            delta += timestamp - lastFrameTimeMs;
            lastFrameTimeMs = timestamp;

            if (timestamp > lastFPSUpdate + 1000) {
                fps = 0.25 * framesThisSecond + 0.75 * fps;
                lastFPSUpdate = timestamp;
                framesThisSecond = 0;
            }

            ++framesThisSecond;

            var numUpdateSteps = 0;

            while (delta >= timestep) {
                currentState = currentState.update(timestep);
                delta -= timestep;

                if (++numUpdateSteps >= 240 || currentState === null) {

                    break;
                }
            }

            draw(delta / timestep);

            if (currentState === null) {
                this.states = this.states.slice(0, -1);

                if (this.states.length === 0) {
                    window.cancelAnimationFrame(mainLoop);
                    console.log("loop stopped");
                    return;
                }
            }

            frameID = requestAnimationFrame(mainLoop);
        })
    }, {
        key: "init",
        value: function init() {
            if (!this.started) {
                this.started = true;
                var state = new GameState(this.canvas, this.context);
                this.states.push(state);

                this.frameID = requestAnimationFrame(function (timestamp) {
                    this.lastFrameTimeMs = timestamp;
                    this.lastFPSUpdate = timestamp;
                    this.framesThisSecond = 0;
                    this.frameID = requestAnimationFrame(this.mainLoop);
                });
            }
        }
    }]);

    return Engine;
})();