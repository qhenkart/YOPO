var Yopo = {
  teammates: [],
  userInfo: {},
  options: {},
  template: Templates['layout'],

  init: function(){
    console.log('running');
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
        var dat = JSON.parse(data)
        var hash = {};
        _.each(dat.exclusions, function(x){
          hash[x] = x;
        });
        if(dat.length > 2){
          hash[Yopo.options.exclude[0]] = Yopo.options.exclude[0]
          hash[Yopo.options.exclude[1]] = Yopo.options.exclude[1]
        }

        Yopo.teammates = _.filter(dat.team, function(x){
          if(hash[x] !== x){
            return x
          }
        }); 
        Yopo.calculatePartner();
      },
      error: function(data){
        console.error("failed Get request", data)
      }
    });
  },

  calculatePartner: function(match) {
    var calc = Math.floor(Math.random() * Yopo.teammates.length);
    var selection = Yopo.teammates[calc];
    if(selection !== undefined){
      $('#container').append(selection);

      $.ajax({
        url: '/updateExclusions',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({selection}),
        success: function (data) {
         console.log("database updated", data);
        },
        error: function (data) {
          console.error('database: Failed to get message');
        }
      });
    }else{
      $('#container').append("No teammates available, Please see your shepard");
    }
  },

  checkPartnerChoices: function(){
    $.ajax({
      url: "/sendInclusions",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(Yopo.options.include),
      success: function(data){
        console.log("database updated", data)
      },
      error: function(data){
        console.error("failed Get request", data)
      }
    });

    $.ajax({
      url: "/getInclusions",
      type: "GET",
      contentType: "application/json",
      success: function(data){
        console.log(data)
        if(data){

        }
      },
      error: function(data){
        console.error("failed Get request", data)
      }
    });
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
    Yopo.options.exclude = $("#exclusions").val().replace(/^ | $|<|>/g, "").replace(' ','-').toLowerCase().split(',').slice(0,2);
    Yopo.options.include = $("#inclusions").val().replace(/^ | $|<|>/g, "").replace(' ', '-').toLowerCase().split(',').slice(0,2);
    Yopo.checkPartnerChoices();
    Yopo.populatePartners();
  });
});











