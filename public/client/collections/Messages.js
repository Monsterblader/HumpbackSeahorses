var Messages = Backbone.Collection.extend({

  model: Message,

  //instantiate new model
  //add model to collection
  addmsg: function(msg){
    var message = new Message({
      user_id: msg.user_id,
      username: msg.username,
      text: msg.text,
      lang: msg.lang,
      room: msg.room,
      translations: msg.translations
    });
    this.add(message);
  }

});