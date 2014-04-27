if (Meteor.isClient) {
  Meteor.subscribe("messages");
  Messages = new Meteor.Collection('messages');    
    
  newMessage = function() {
    var input = document.getElementById('message-input');
    console.log(Messages);
    if (input.value != '') {
      Messages.insert({
        'author'  : Meteor.user(),
        'body'    : input.value,
        'time'    : Date.now()
      }, function(err, id) {
        if (err) {
          alert('Something definitely went wrong!');
        }
        if (id) {
          input.value = '';
        }
      });
    } 
  }
  
  Template.chatBox.events({
    'keydown #add-message-form input': function(e) {
      if (e.which == 13) {
        newMessage();
      }
    },
    'submit #add-message': function(e) {
      e.preventDefault();
      newMessage(); 
    }
  })
  
  Template.chatBox.messages = function() {
    return Messages.find( {}, { sort: { time: -1 }} );    
  }

  
  Template.viewLogged.name = function() {
    return Meteor.user().services.facebook.name;
  }
  
  Meteor.startup(function() {
    Template.allUsers.users = function() {
      return Meteor.users.find({});
    }
  });
}