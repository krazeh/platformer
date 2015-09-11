'use strict';

class GameState extends BaseState {
    constructor(canvas, context) {
        super(canvas, context);
        this.finished = false;
    }

    update(delta) {
        super.update(delta);

        if (!this.finished)
            return this;
        return null;
    }

    terminate() {
        this.finished = true;
    }

    draw(interpolation) {
        super.draw(interpolation);
    }
}