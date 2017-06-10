import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('messages', function messagesPublication() {
    return Messages.find();
  });
}

Meteor.methods({
  'messages.insert'(messageText) {
    check(messageText, String);
 
    // Make sure the user is logged in before inserting a message
    if (! this.userId) {
        alert('You need to login to perform this action!');
      throw new Meteor.Error('You need to login to perform this action!');
    }
    
    //Make sure message is not empty
    if(messageText.length < 1 || messageText === null) {
      alert('Invalid message!');
      throw new Meteor.Error('invalid-message');
    }
 
    // Insert a message into the collection
    Messages.insert({
      messageText,// actual Message
      createdAt: new Date(), // current time
      ownedBy: this.userId,//Message owner
      username: this.username, //Owner Username // Meteor.user().username
    });
  },
  'messages.remove'(messageId) { 
    check(messageId, String);
      
    // Make sure the user is logged in before deleting a message
    if (! this.userId) {      
     alert('You need to login to perform this action!');
      throw new Meteor.Error('You need to login to perform this action!');
    }
      else{
          const message = Messages.findOne(messageId);
          // Make sure only the message owner can delete message 
          if (message.ownedBy !== this.userId) {
              alert('Not authorized!');
              throw new Meteor.Error('not-authorized');
            } 
      }
    
    //remove message from collection
    Messages.remove(messageId);
  },
});

