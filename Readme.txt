Error: alert is not defined



RUNNING THE APP.
------------------------------------------------
1. Extract iStatus.zip to a desired location 
2. open terminal (Mac) / command prompt (Windows).
3  Navigate to the path of the extracted file using the 'cd command'
4. Type meteor in command area
5. Open your web browser and go to http://localhost:3000 to see the app running.


TESTING THE APP.
------------------------------------------------
1. Terminate the main application from running by pressing ctrl+c twice on your command window.
2. Run this command meteor test --driver-package practicalmeteor:mocha
3  Open your web browser and go to http://localhost:3000 to see the test app running.

NOTE :
------------------------------------------------
1. The following tests failed as expected because users cannot delete other users' messages and cannot post messages while logged out.
* user can delete other user message
* User can post messages while logged out

2. Delete button only appear against messages owned by the current user.

