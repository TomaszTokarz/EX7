var Stock = Backbone.Collection.extend({
    url: 'http://rt.ex7.pl/get-data',
    model: Supply,

    data: function() {
        return {
            sort_column: this.sortColumn,
            sort_order: this.sortOrder,
            filter: this.filter,
            page_size: this.pageSize,
            page: this.page
        };
    },

    initialize: function() {
        var url = new URL(window.location.href);
        var params = url.searchParams;

        this.pageSize = params.get('page_size') || 20;
        this.page = params.get('page') || 1;
        this.filter = params.get('filter') || '';
        this.sortOrder = params.get('sort_order') || 'asc';
        this.sortColumn = params.get('sort_column') || 'name';
    }
});

var stock = new Stock();
