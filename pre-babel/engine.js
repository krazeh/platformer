'use strict';

class Engine {

    constructor() {
        this.lastFrameTimeMs = 0
        this.maxFPS = 60;
        this.delta = 0;
        this.timestep = 1000 / 60;
        this.fps = 60;
        this.framesThisSecond = 0;
        this.lastFPSUpdate = 0;
        this.started = false;
        this.frameID = null;
        this.maxSkipMs = 0.01;
        this.fpsDisplay = document.getElementById("fps"),
        this.states = [],
        this.canvas = document.getElementById("myCanvas"),
        this.context = this.canvas.getContext("2d");
    }

    update(delta) {

    }


    mainLoop(timestamp) {
        if (timestamp - lastFrameTimeMs <= maxSkipMs) {
            frameID = requestAnimationFrame(mainLoop);
            return;
        }

        let currentState = this.states.slice(-1);
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

        draw(delta/timestep);

        if (currentState === null) {
            this.states = this.states.slice(0, -1);

            if (this.states.length === 0) {
                window.cancelAnimationFrame(mainLoop);
                console.log("loop stopped");
                return;
            }
        }

        frameID = requestAnimationFrame(mainLoop);
    }

    init() {
        if (!this.started) {
            this.started = true;
            var state = new GameState(this.canvas, this.context);
            this.states.push(state);

            this.frameID = requestAnimationFrame(function (timestamp) {
                this.lastFrameTimeMs = timestamp;
                this.lastFPSUpdate = timestamp;
                this.framesThisSecond = 0;
                this.frameID = requestAnimationFrame(this.mainLoop);
            })
        }
    }
}