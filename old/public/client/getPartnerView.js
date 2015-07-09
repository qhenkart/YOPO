window.storage = []
Yopo.getPartnerView = Backbone.View.extend({
  className: 'getPartner',

  template: Templates['getPartner'],

  events: {
     'click': 'getPartner'
  },


  render: function() {
    debugger;
    this.$el.html( this.template() );
    return this;
  },

  getPartner: function(e) {
    e.preventDefault();
    var context = this;
    var teammates = new Yopo.TeamMates();
    teammates.fetch({
      success:function(data_array){
        debugger;
        console.log(data_array)
        data = data_array.models[0].attributes;
        data = JSON.stringify(data);
        console.log(data);
        var data = "<p>" + data + "</p>" ; 
        $('#data').append(data);
      }
    });
  },
    // $.ajax({
    //   url: "/getPartner",
    //   type: "GET",
    //   contentType: "application/json",
    //   success: function(data){
    //     _.each(data, function(x){
    //       window.storage.push(x);
    //     });
    //     debugger;
    //     this.calculatePartner();
    //   }
    // })

  calculatePartner: function() {
    var calc = Math.floor(Math.random() * window.storage.length);
    console.log(window.storage[calc]);


  }

});
