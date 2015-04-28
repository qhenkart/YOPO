Yopo.Router = Backbone.Router.extend({
  initialize: function(options){
    this.$el = options.el;
  },

  routes: {
    '': 'index',
    'getpartner': 'getpartner',
    'editprofile': 'editprofile'
  },

  getpartner: function(){
    this.swapView(new Yopo.getPartnerView());
  },

  swapView: function(view){
    this.$el.html(view.render().el);
  }
  // ,

  // index: function(){
  //   // var links = new Shortly.Links();
  //   // var linksView = new Shortly.LinksView({ collection: links });
  //   // this.swapView(linksView);
  // },

  // create: function(){
  //   // this.swapView(new Shortly.createLinkView());
  // }


});
