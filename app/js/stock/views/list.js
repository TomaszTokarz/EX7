var StockCollectionView = Backbone.Marionette.CompositeView.extend( {
    el: '.main_container',
    template: Handlebars.compile( $('#stock_template').html() ),
    childViewContainer: '.stock__table__body',
    childView: SupplyItemView,
    collection: stock,

    ui: {
        pageSizeIndicator: '.js_page_size_indicator',
        nextPageButton: '.js_next_page',
        previousPageButton: '.js_previous_page',
        acronymButton: '.js_acronym_button',
        idButton: '.js_id_button',
        nameButton: '.js_name_button',
        sortIndicators: '.js_sort_indicator',
    },

    events: {
        'click @ui.pageSizeIndicator': 'changePageSizeIndicator',
        'click @ui.nextPageButton': 'nextPage',
        'click @ui.previousPageButton': 'previousPage',
        'click @ui.acronymButton': 'sortByAcronym',
        'click @ui.idButton': 'sortById',
        'click @ui.nameButton': 'sortByName',
    },

    initialize: function() {
        this.render();
        this.refreshCollection();
    },

    changePageSizeIndicator: function(ev) {
        this.collection.pageSize = parseInt($(ev.target).attr('value'));
        $(this.ui.pageSizeIndicator).removeClass('active');
        $(ev.target).addClass('active');
        this.collection.page = 1;
        this.refreshCollection();
    },

    refreshCollection: function() {
        // console.log(app.layout.loader)

        $.ajax({
            url: 'http://rt.ex7.pl/get-data',
            method: 'POST',
            data: {
                sort_column: this.collection.sortColumn,    // sorting column
                sort_order: this.collection.sortOrder,      // sorting type ('asc', 'desc')
                filter: this.collection.filter,             // data filter string
                page_size: this.collection.pageSize,        // pagening page size (not greater than 1000)
                page: this.collection.page                 // pagening page number (ordering from 1)
            },
            success: function(data) {
                this.collection.reset();
                this.collection.add(data);
                if(app.layout.loader){
                    app.layout.loader.remove();
                    app.layout.loader = false;
                }

            }.bind(this),
            error: function(data) {
                console.error('Connection failed');
            }
        })
    },
    nextPage: function() {
        this.collection.page++;
        this.refreshCollection();
        if (!this.ui.previousPageButton.hasClass('active')) {
            this.ui.previousPageButton.addClass('active')
        }
    },

    previousPage: function() {
        if (this.collection.page > 1) {
            this.collection.page--;
            this.refreshCollection();
            if (this.collection.page = 1) {
                this.ui.previousPageButton.removeClass('active')
            }
        }
    },

    sortByAcronym: function(ev) {
        this.sortStock('acronym', ev);
    },

    sortById: function(ev) {
        this.sortStock('id', ev);
    },

    sortByName: function(ev) {
        this.sortStock('name', ev);
    },

    sortByFilter: function(string) {
        this.collection.filter = string;
        this.collection.page = 1;
        this.refreshCollection();
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
            $(ev.currentTarget.children).addClass('descent');
            this.collection.sortOrder = 'desc';
            this.collection.sortColumn = sortColumn;
        }
        this.collection.page = 1;
        this.refreshCollection();
    }
});
