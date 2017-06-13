var TableNavView = Backbone.Marionette.View.extend({

    className: 'table__nav',
    template: Handlebars.compile( $('#table_nav_template').html() ),

    ui: {
        pageSizeIndicator: '.js_page_size_indicator',
        nextPageButton: '.js_next_page',
        previousPageButton: '.js_previous_page',
        currentPage: '.js_current_page'
    },

    events: {
        'click @ui.pageSizeIndicator': 'changePageSizeIndicator',
        'click @ui.nextPageButton': 'nextPage',
        'click @ui.previousPageButton': 'previousPage',
        'click @ui.currentPage': 'changePage'
    },

    initialize: function() {
        $(this.render().el).appendTo(this.options.container);
        this.refreshNavBar();
    },

    changePageSizeIndicator: function(ev) {
        app.layout.currentView.changePageSizeIndicator(ev);
    },

    nextPage: function() {
        app.layout.currentView.nextPage();
    },

    previousPage: function() {
        app.layout.currentView.previousPage();
    },

    refreshNavBar: function() {
        var indicators = this.ui.pageSizeIndicator;
        indicators.removeClass('active');
        for (var i = 0; i < indicators.length; i++) {
            if ( $(indicators[i]).attr('data-value') == stock.pageSize) {
                $(indicators[i]).addClass('active');
            }
        };
        if (stock.page == 1) {
            this.ui.previousPageButton.addClass('inactive');
        } else {
            this.ui.previousPageButton.removeClass('inactive');
        }
        this.ui.currentPage.html(stock.page);
    },

    changePage: function() {
        stock.page = prompt('Go to page no:', stock.page);
        app.layout.currentView.refreshCollection('page', stock.page);
    }
});
