var LayoutView = Backbone.Marionette.View.extend({

    el: '.js-app-container',
    template: Handlebars.compile( $('#layout_template').html() ),
    currentView: false,

    ui: {
    },

    events: {
    },

    initialize: function() {
        this.render();
    },

    onRender: function() {
        this.headerView = new HeaderView();
        this.currentView = new StockCollectionView();
    }
});
