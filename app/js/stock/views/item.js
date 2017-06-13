var SupplyItemView = Backbone.Marionette.View.extend({
    tagName: 'li',
    className: 'stock__table__body_supply',
    template: Handlebars.compile( $('#supply_template').html() )
});
