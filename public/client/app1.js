var Yopo = {
  teammates: [],
  userInfo: {},
  template: Templates['layout'],

  init: function(){
    console.log('running');
    // Yopo.userInfo[data]
    debugger;
    // console.log(data)
    var el = $("<div></div>");
    $('body').append(Yopo.render(el, Yopo.template))
  },

  render: function(el, template){
    el.html( template() );
    return el; 
  },

  swapView: function(el, template){
    $('#container').html(Yopo.render(el, template));
  },

  populatePartners: function(){
    $.ajax({
      url: "/getPartner",
      type: "GET",
      contentType: "application/json",
      success: function(data){
        _.each(data, function(x){
          Yopo.teammates.push(x);
        });
        Yopo.calculatePartner();
      },
      error: function(data){
        console.error("failed Get request", data)
      }
    });
  },

  calculatePartner: function() {
    var calc = Math.floor(Math.random() * Yopo.teammates.length);
    $('#container').append(Yopo.teammates[calc]);
  }
  
}

$(document).ready(function(){

  $(document).on('click','.getpartner',function(e){
    e.preventDefault();
    var el = $('<div class="getPartner"></div>');
    var template = Templates['getPartner'];
    Yopo.swapView(el, template)
  });

  $(document).on('click','.populatePartners',function(e){
    e.preventDefault();
    Yopo.populatePartners();
  });


  // $('.getpartner').on('click', function(e){
  //   e.preventDefault();
  //   var el = $('<div class="getPartner"></div>');
  //   var template = Templates['getPartner'];
  //   Yopo.swapView(el, template)
  // });

  // $('#container').find('.populatePartners')[0].on('click', function(e){
  //   debugger;
  //   e.preventDefault();
  //   Yopo.populatePartners();
  // })
});