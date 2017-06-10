var StockCollectionView = Backbone.Marionette.CompositeView.extend( {
    el: '.main_container',
    template: Handlebars.compile( $('#stock_template').html() ),
    childViewContainer: '.stock__table__body',
    childView: SupplyItemView,
    pageSize: 20,
    page: 1,

    ui: {
        pageSizeIndicator: '.js_page_size_indicator',
        wholeTable: '.stock__table__body'
    },

    events: {
        'click @ui.pageSizeIndicator': 'changePageSizeIndicator'
    },

    initialize: function() {
        this.collection = new Stock();
        this.render();
        this.collection.on('change',this.render, this);
        this.refreshCollection();
    },

    changePageSizeIndicator: function(ev) {
        this.pageSize = parseInt($(ev.target).attr('value'));
        $(this.ui.pageSizeIndicator).removeClass('active');
        $(ev.target).addClass('active');
        this.refreshCollection()
    },

    refreshCollection: function() {
        $.ajax({
            url: 'http://rt.ex7.pl/get-data',
            method: 'POST',
            data: {
                sort_column: '',    // sorting column
                sort_order: '',             // sorting type ('asc', 'desc')
                filter: '',                 // data filter string
                page_size: this.pageSize,            // pagening page size (not greater than 1000)
                page: this.page                   // pagening page number (ordering from 1)
            },
            success: function(data) {
                app.layout.currentView.collection.add(data);
            },
            error: function(data) {
                console.error('Connection failed');
            }
        })
    }
});
