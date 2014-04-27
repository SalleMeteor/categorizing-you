if (Meteor.isServer) {
  Messages = new Meteor.Collection('messages');    
  Meteor.startup(function () {
    Accounts.onCreateUser(function(options, user) {
      if (options.profile) {
          options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
          user.profile = options.profile;
      }
      return user;
    });
  });
  
  // server: don't allow client to insert a party
  Messages.allow({
    insert: function () {
      return true;
    }
  });
}