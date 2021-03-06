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
        var exclusions = {};
        debugger;
        // _.each(dat.exclusions, function(user){
        //   exclusions[x] = user.username;
        // });
       

        // Yopo.teammates = _.filter(dat, function(user){
        //   if(exclusions[x] !== user.username){
        //     return user
        //   }
        // }); 
        Yopo.teammates = dat
        Yopo.populateMenus();
      },
      error: function(data){
        console.error("failed Get request", data)
      }
    });
  },
  populateMenus: function(){
    _.each(Yopo.teammates, function(person){
      $('#inclusions, #exclusions').append('<li><a href="#" value='+person.username+'>'+person.name+'</a></li>');
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
  }

  //   $.ajax({
  //     url: "/getInclusions",
  //     type: "GET",
  //     contentType: "application/json",
  //     success: function(data){
  //       console.log(data)
  //       if(data){

  //       }
  //     },
  //     error: function(data){
  //       console.error("failed Get request", data)
  //     }
  //   });
  // }
  
}

$(document).ready(function(){

  $(document).on('click','.getpartner',function(e){
    e.preventDefault();
    var el = $('<div class="getPartner"></div>');
    var template = Templates['getPartner'];
    Yopo.swapView(el, template);
    Yopo.populatePartners();

  });

  $(document).on('click','.populatePartners',function(e){
    e.preventDefault();
    // Yopo.options.exclude = $("#exclusions").val().replace(/^ | $|<|>/g, "").replace(' ','-').toLowerCase().split(',').slice(0,2);
    // Yopo.options.include = $("#inclusions").val().replace(/^ | $|<|>/g, "").replace(' ', '-').toLowerCase().split(',').slice(0,2);
    // Yopo.checkPartnerChoices();
    Yopo.calculatePartner();
  });
});











