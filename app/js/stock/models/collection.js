var Stock = Backbone.Collection.extend({
    model: Supply,

    initialize: function(options) {
        console.log("collection Stock initialized")
    }
});
