'use strict';

class BaseState {
    constructor(canvas, context) {
        this.canvas = canvas;
        this.context = context;
        this.objects = [];
    }

    update(delta) {
        for (let obj of this.objects)
            obj.update(delta);
    }

    draw(interpolation) {
        this.objects = Sort.zSort(objects);

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let obj of this.objects)
            obj.draw(this.context, interpolation);
    }
}