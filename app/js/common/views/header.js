var HeaderView = Backbone.Marionette.View.extend({

    el: '.js-header-container',
    template: Handlebars.compile( $('#header_template').html() ),

    initialize: function() {
        this.render();
    }
});
