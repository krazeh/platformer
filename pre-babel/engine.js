'use strict';

class Engine {

    constructor() {
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
        this.fpsDisplay = document.getElementById("fps");
        this.states = [];
        this.canvas = document.getElementById("myCanvas");
        this.context = this.canvas.getContext("2d");
    }

    mainLoop(timestamp) {
        if (timestamp - this.lastFrameTimeMs <= this.maxSkipMs) {
            this.frameID = requestAnimationFrame(this.mainLoop.bind(this));
            return;
        }

        let currentState = this.states.slice(-1)[0];
        this.delta += timestamp - this.lastFrameTimeMs;
        this.lastFrameTimeMs = timestamp;

        if (timestamp > this.lastFPSUpdate + 1000) {
            this.fps = 0.25 * this.framesThisSecond + 0.75 * this.fps;
            this.lastFPSUpdate = timestamp;
            this.framesThisSecond = 0;
        }

        ++this.framesThisSecond;

        var numUpdateSteps = 0;

        while (this.delta >= this.timestep) {
            currentState = currentState.update(this.timestep);
            this.delta -= this.timestep;

            if (++numUpdateSteps >= 240 || currentState === null) {

                break;
            }
        }


        if (currentState === null) {
            this.states = this.states.slice(0, -1);

            if (this.states.length === 0) {
                window.cancelAnimationFrame(this.mainLoop);
                console.log("loop stopped");
                return;
            }
        }

        currentState.draw(this.delta/this.timestep);

        this.frameID = requestAnimationFrame(this.mainLoop.bind(this));
    }

    init() {
        if (!this.started) {
            this.started = true;
            var state = new GameState(this.canvas, this.context);
            var self = this;
            var loop = self.mainLoop;
            self.states.push(state);

            this.frameID = requestAnimationFrame(function (timestamp) {
                self.lastFrameTimeMs = timestamp;
                self.lastFPSUpdate = timestamp;
                self.framesThisSecond = 0;
                self.frameID = requestAnimationFrame(loop.bind(self));
            })
            
        }
    }
}