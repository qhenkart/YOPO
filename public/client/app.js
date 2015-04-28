// var database = {'Quest': [], 'Yuriy': [], 'Sunshine': [], 'Kyle': []}
window.Yopo = Backbone.View.extend({
  template: Templates['layout'],

  events: {
     // 'click li a.getPartner': console.log("wahoo")
     'click li a.editprofile':  'renderEditProfile',
     'click li a.getpartner': 'renderGetPartner'
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
  },

  // render: function(e){
  //   e && e.preventDefault();
  //   this.router.navigate('/', { trigger: true });
  // },

  renderGetPartner: function(e){
    e && e.preventDefault();
    this.router.navigate('/getpartner', { trigger: true });
  }
});
  


