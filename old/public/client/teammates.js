Yopo.TeamMate = Backbone.Model.extend({
  urlRoot: '/getPartner'
});


Yopo.TeamMates = Backbone.Collection.extend({
  model: Yopo.TeamMate,
  url: '/getPartner'
});
