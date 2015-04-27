var database = {'Quest': [], 'Yuriy': [], 'Sunshine': [], 'Kyle': []}
window.Yopo = Backbone.View.extend({
  template: Templates['layout'],

  events: {
    // 'click li a.index': console.log("wahoo")
  },

  initialize: function(){
    console.log("running");
    $('body').append(this.render().el);

    this.router = new Yopo.Router({el: this.$el.find('#container') });
    this.router.on('route', this.updateNav, this);

    Backbone.history.start({pushState: true})
  },
  render: function(){
    this.$el.html( this.template() );
    return this;
  }
  // ,

  // updateNav: function(routeName){
  //   this.$el.find('.navigation li a')
  //     .removeClass('selected')
  //     .filter('.' + routeName)
  //     .addClass('selected');
  // }

})
  


