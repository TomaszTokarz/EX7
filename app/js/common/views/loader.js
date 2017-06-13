var LoaderView = Backbone.Marionette.View.extend({

    tagName: 'div',
    className: 'loader',
    template: Handlebars.compile( $('#loader_template').html() ),

    initialize: function() {
        $(this.render().el).appendTo('.body');
    },

    hide: function() {
        this.$el.hide();
    },
    show: function() {
        this.$el.show();
    },
});
