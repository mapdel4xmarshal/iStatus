import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'; 
import { Messages } from '../api/messages.js';
import './message.js';
 
import './body.html';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('messages');
});

Template.body.helpers({
  messages() { 
    return Messages.find({}, { sort: { createdAt: -1 } });
  },
}); 

Template.body.events({
  'submit .new-message'(event) {
    // Prevent default browser form submit
    event.preventDefault(); 
 
    // Get value from form element
    const target = event.target;
    const messageText = target.messageText.value;
      
    //Insert message through method on server
    Meteor.call('messages.insert', messageText);
 
    // Clear form
    target.messageText.value = '';
  },
});