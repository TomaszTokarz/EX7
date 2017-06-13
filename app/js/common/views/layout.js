var LayoutView = Backbone.Marionette.View.extend({

    el: '.js-app-container',
    template: Handlebars.compile( $('#layout_template').html() ),
    currentView: false,
    loader: true,

    ui: {
        filterInput: '.js_filter_input'
    },

    events: {
        'keyup @ui.filterInput': 'search'
    },

    initialize: function() {
        this.render();
    },

    onRender: function() {
        this.loader = new LoaderView();
        this.headerView = new HeaderView();
        this.currentView = new StockCollectionView({
            loaderView: this.loader
        });
    },

    search: function(ev) {
        this.currentView.sortByFilter(ev.target.value);
    }
});
