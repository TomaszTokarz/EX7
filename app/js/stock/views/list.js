var StockCollectionView = Backbone.Marionette.CompositeView.extend( {
    el: '.main_container',
    template: Handlebars.compile( $('#stock_template').html() ),
    childViewContainer: '.stock__table__body',
    childView: SupplyItemView,

    initialize: function() {
        this.collection = new Stock();
        this.render();
        this.refreshCollection({
            page_size: "50"
        });
    },
    refreshCollection: function(filters) {
        $.ajax({
            url: "http://rt.ex7.pl/get-data",
            method: 'POST',
            data: filters,
            // {
            //     sort_column: "acronym",    // sorting column
            //     sort_order: "",             // sorting type ("asc", "desc")
            //     filter: "",                 // data filter string
            //     page_size: "50",            // pagening page size (not greater than 1000)
            //     page: "1"                   // pagening page number (ordering from 1)
            // },
            success: function(data) {
                console.log(data);
                app.layout.currentView.collection.add(data);
            },
            error: function(data) {
                console.error("Connection failed");
            }
        })
    }
});
