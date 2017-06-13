var StockCollectionView = Backbone.Marionette.CompositeView.extend( {
    el: '.main_container',
    template: Handlebars.compile( $('#stock_template').html() ),
    childViewContainer: '.stock__table__body',
    childView: SupplyItemView,
    collection: stock,
    navView: [],
    pagination: true,

    ui: {
        acronymButton: '.js_acronym_button',
        idButton: '.js_id_button',
        nameButton: '.js_name_button',
        sortIndicators: '.js_sort_indicator'
    },

    events: {
        'click @ui.acronymButton': 'sortByAcronym',
        'click @ui.idButton': 'sortById',
        'click @ui.nameButton': 'sortByName'
    },

    initialize: function(options) {
        this.loaderView = options.loaderView;
        this.render();
        this.collection.on('sync', _(this.removeLoader).bind(this));
        this.collection.fetch({
            method: 'POST',
            data: this.collection.data()
        })
        this.infiniteScroll();
    },

    onRender: function() {
        this.navView[0] = new TableNavView({
            container: '.header_container'
        });
        this.navView[1] = new TableNavView({
            container: '.stock__table__footer'
        });
    },

    changePageSizeIndicator: function(ev) {
        if (parseInt($(ev.target).attr('data-value')) == 0) {
            this.collection.pageSize = 20;
            this.pagination = false;
        } else {
            this.pagination = true;
            this.collection.pageSize = parseInt($(ev.target).attr('data-value'));
        }
        this.collection.page = 1;
        this.refreshCollection('page_size', this.collection.pageSize);
    },

    nextPage: function() {
        this.collection.page++;
        this.refreshCollection('page', this.collection.page);
    },

    previousPage: function() {
        if (this.collection.page > 1) {
            this.collection.page--;
            this.refreshCollection('page', this.collection.page);
        }
    },

    infiniteScroll: function() {
        $(window).scroll(function() {
            if ($(window).scrollTop() + $(window).height() == $(document).height() && this.pagination == false) {
                this.refreshCollection('page', this.collection.page++ );
            }
        }.bind(this));
    },

    refreshCollection: function() {
        for (var i = 0; i < arguments.length / 2; i++) {
            this.replaceQueryParam(arguments[2 * i], arguments[2 * i + 1])
        }
        this.options.loaderView.show();
        this.collection.fetch({
            method: 'POST',
            data: this.collection.data(),
            remove: this.pagination
        });
        this.refreshNavBar(this.pagination);
    },

    refreshNavBar: function() {
        for (var i = 0; i < this.navView.length; i++) {
            this.navView[i].refreshNavBar(this.pagination);
        }
    },

    removeLoader: function() {
        this.options.loaderView.hide();
    },

    sortByAcronym: function(ev) {
        this.sortStock('acronym', ev);
        $(this.ui.acronymButton).addClass('mobile');
    },

    sortById: function(ev) {
        this.sortStock('id', ev);
        $(this.ui.acronymButton).removeClass('mobile');
    },

    sortByName: function(ev) {
        this.sortStock('name', ev);
        $(this.ui.acronymButton).removeClass('mobile');
    },

    sortByFilter: function(string) {
        this.collection.filter = string;
        this.collection.page = 1;
        this.refreshCollection('page', this.collection.page, 'filter', this.collection.filter);
    },

    sortStock: function(sortColumn, ev) {
        this.ui.sortIndicators.removeClass('ascent descent');
        if (this.collection.sortColumn == sortColumn) {
            if (this.collection.sortOrder == 'asc') {
                $(ev.currentTarget.children).addClass('descent');
                this.collection.sortOrder = 'desc';
            } else {
                $(ev.currentTarget.children).addClass('ascent');
                this.collection.sortOrder = 'asc';
            }
        } else {
            $(ev.currentTarget.children).addClass('ascent');
            this.collection.sortOrder = 'asc';
            this.collection.sortColumn = sortColumn;
        }
        this.collection.page = 1;
        this.refreshCollection('sort_column', this.collection.sortColumn, 'sort_order', this.collection.sortOrder, 'page', this.collection.page);
    },

    replaceQueryParam: function(param, val) {
        var regex = new RegExp("([?;&])" + param + "=[^&;]*[;&]?");
        var query = window.location.search.replace(regex, "$1").replace(/&$/, '');
        var str = (query.length > 2 ? query + "&" : "?") + (val ? param + "=" + val : '');
        history.replaceState({}, 'Ex7', window.location.pathname + str);
    }
});
