var LoaderView = Backbone.Marionette.View.extend({

    //el: '.loader',
    tagName: 'div',
    className: 'loader',
    template: Handlebars.compile( $('#loader_template').html() ),

    initialize: function() {
        $(this.render().el).appendTo('.body');
    }
});
