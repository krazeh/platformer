'use strict';

class Engine {

    constructor(canvas) {
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
        this.canvas = canvas,
        this.context = canvas.getContext("2d");
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
            currentState.update(timestep);
            delta -= timestep;

            if (++numUpdateSteps >= 240) {

                break;
            }
        }

        draw(delta/timestep);
        frameID = requestAnimationFrame(mainLoop);
    }
}