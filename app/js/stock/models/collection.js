var Stock = Backbone.Collection.extend({
    model: Supply,
    pageSize: 20,
    page: 1,
    filter: '',
    sortOrder: 'asc',        // asc or desc
    sortColumn: 'name'
});

var stock = new Stock();
