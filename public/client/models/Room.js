//setup backbone room model
var Room = Backbone.Model.extend({
  defaults:{
    room:'',
    lang: 'en',
    translations: {}
  }
});
