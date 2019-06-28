var posts = function() {
    var self = this;
    self.val = "";
    self.type = 1;
}

var postits = [];
var img_dom = document.getElementById("gomibako");

new Vue({
    el: '#postit_manager',
    data: {
        postits: postits,
        typeVal: 1,
        dragPostit: null,
        image: "img/gomibako_empty.png",
    },
    methods: {
        add_component() {
            console.log("add_component")
            this.postits.unshift(new posts());
        },
        //Drag Drop
        dragover: function (postit) {
            console.log(this.typeVal);
            if(this.typeVal == 0) {
                this.image = "img/gomibako_full.png";
            }
            postit.type = this.typeVal;
        },
        drop: function () {
            console.log('drop');
            this.image = "img/gomibako_full.png";
            this.dragPostit.type = 0;
        },
        dragstart: function (/** TaskItem **/ postit, typeVal) {
            console.log('dragstart');
            console.log(typeVal);
            this.dragPostit = postit;
            this.typeVal = typeVal;
        },
        dragend: function (/** TaskItem **/) {
            console.log('dragend');
            this.dragPostit = null;
        }
    }
}
)