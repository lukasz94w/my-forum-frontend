# my-forum-frontend
This repository contains the frontend of the forum web application. It was developed using the Angular framework. The backend part can be found at this address: https://github.com/lukasz94w/my-forum-backend. The application uses all available endpoints (as well as WebSockets) provided by the backend. After startup, the application is available on port 4200 (localhost:4200). Its operation was tested on Google Chrome and Opera.

The following technologies / libraries were used to develop the application:
- Angular,
- TypeScript,
- HTML,
- CSS,
- ngx-image-cropper.

## Description of forum functionalities
The main view summarizes all topics and posts grouped by category (such as programming or electronics). You can browse the topics in a given category and search for them by name. The same goes for posts. Other implemented features of the standard forum include adding new topics or leaving comments (posts) under existing ones.

The application includes a dedicated view of the user profile, in which it is possible, for example, to view topics created by him or added posts. The logged in user can additionally change the password or profile picture.

The administrator also has a tab at his disposal where he can ban or unbans forum users (the date and reason for the ban are given). A banned user (thanks to listening to the WebSocket stomp endpoint) will immediately find out about the ban and then be automatically logged out.

Yet another administrator's right is the ability to hide posts that violate the forum rules and to close or delete existing topics.

If case of forgetting the password it can be reset it via the e-mail provided in registration. The option of remembering the user has been added, thanks to which the user will remain logged in even after the browser is completely closed (an additional condition is the validity of the refresh token).

The forum has a simple protection against bot accounts in the form of the need to confirm the created account using the e-mail address provided during the registration process. Until that moment, the account will be inactive.

Other implemented functionalities include:
- auto logout function after the refresh token expires,
- scroll function to the last post added in the topic.

## Screenshots

## Improvements
It is possible to add new functionalities / improvements to the application, such as: 
- use skeleton loader when fetching data, 
- reuse PostListComponent in UserProfileSettingsPostListComponent (it is practically the same HTML/CSS code and using it in the mentioned component would prevent code duplication), the same applies to TopicListComponent and UserProfileSettingsTopicListComponent.
