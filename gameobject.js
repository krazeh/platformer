'use strict';
var Sort = {
    zSort: function (objects) {
        let list = objects,
            copy,
            i,
            j,
            len = objects.length;

        for (i = 0; i < len; ++i) {
            copy = list[i];

            for (j = i-1; j > -1 && list[j].z > copy.z; --j) {
                list[j+1] = list[j];
            }

            list[j+1] = copy;
        }

        return list;
    }
}