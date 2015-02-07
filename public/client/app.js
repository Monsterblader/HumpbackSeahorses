//initialize
var socket = io();
var vent = _.extend({}, Backbone.Events);
var styleTool = function(){};

$(function(){
  //display users language functionality
  $('#dispLang').on('click', function(){
    vent.trigger('click:dispLang', this.checked);
  });

  var messages = new Messages();
  var submitView = new SubmitView({
    el: $('.submitView'),
    collection: messages
  });

  var messagesView = new MessagesView({
    el: $('#messagesView'),
    collection: messages
  });

  var rooms = new Rooms();
  var roomsView = new RoomsView({
    el: $('.activeRooms'),
    collection: rooms
  });

  var usersInRoomView = new UsersInRoomView({
    collection: messages
  });

  //define injectable/removable styles for user message ignoring and highlighting
  styleTool = function($element, action) {
    var rule = "";
    var id = $element.data("user_id");
    var ignore = $element.data("ignore");
    var highlight = $element.data("highlight");

    if(action === 'toggleHighlight'){
      if(!highlight || highlight === "OFF"){
        rule = '.message-display[data-user_id="' + id + '"] { color: orange; }';
        rule = rule + '[data-user_id="' + id + '"] { color: orange; }';
        $("[data-user_id='" + id + "']").data("highlight", "ON");
      }else{
        $('style[data-user_id="' + id + '"]').remove();
        $("[data-user_id='" + id + "']").data("highlight", "OFF");
        return;
      }
    }

    if(action === 'toggleIgnore'){
      if(!ignore || ignore === "OFF"){
        rule = '.message-display[data-user_id="' + id + '"] { display: none; }';
        rule = rule + '[data-user_id="' + id + '"] { color: dimgray; }';
        $("[data-user_id='" + id + "']").data("ignore", "ON");
      }else{
        $('style[data-user_id="' + id + '"]').remove();
        $("[data-user_id='" + id + "']").data("ignore", "OFF");
        return;
      }
    };

    var div = $("<div />", {html: '&shy;<style data-user_id="' + id + '">' + rule + '</style>'})
              .appendTo("body");
  };

});

//drag and drop functions for ignore
var allowDrop = function(ev) {
  ev.preventDefault();
}

var drag = function(ev) {  
  ev.dataTransfer.setData("text", ev.currentTarget.dataset.user_id);
};

var drop = function(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  styleTool($('[data-user_id="' + data + '"]'), "toggleIgnore");
}