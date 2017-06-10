var app = {
    init: function() {
        app.layout = new LayoutView();
        // app.pingApi();
    },

    pingApi: function() {
        $.ajax({
            url: "http://rt.ex7.pl/ping",
            method: 'GET',
            success: function(data){
                console.log("Connection established correctly, server responses: ", data.response);
                app.getData();
            },
            error: function(data) {
                console.error("Connection failed");
            }
        })
    },

    getData: function() {
        
    }
};

$(function() {
    app.init();
});
