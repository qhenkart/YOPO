Yopo.TeamMates = Backbone.Collection.extend({
  model: Yopo.TeamMate,
  url: '/getPartner'
});

Yopo.TeamMate = Backbone.Model.extend({
  urlRoot: '/getPartner'
});