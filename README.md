# my-forum-frontend
This repository contains the frontend of the forum web application. It was developed using the Angular framework. The backend part can be found at: https://github.com/lukasz94w/my-forum-backend. The application uses all available endpoints (as well as WebSockets) provided by the backend. After startup, the application is available on port 4200 (localhost:4200). Its operation was tested on Google Chrome and Opera.

The following technologies / libraries were used in the project:
- Angular,
- TypeScript,
- HTML,
- CSS,
- ngx-image-cropper.

## Description of forum functionalities
The main view summarizes all topics and posts grouped by category (such as programming or electronics). User can browse the topics in a given category and search for them by name. The same goes for posts. Other implemented features of the standard forum include adding new topics or leaving comments (posts) under existing ones.

The application includes a dedicated view of the user profile, in which it is possible, for example, to view topics created by him or added posts. The logged in user can additionally change the password or profile picture.

The administrator also has a tab at his disposal where he can ban or unbans forum users (the date and reason for the ban are given). A banned user (thanks to listening to the WebSocket stomp endpoint) will immediately find out about the ban and then be automatically logged out.

Yet another administrator's right is the ability to hide posts that violate the forum rules and to close or delete existing topics.

If case of forgetting the password it can be reset it via the e-mail provided in registration. The option of remembering the user has been added, thanks to which the user will remain logged in even after the browser is completely closed (an additional condition is the validity of the refresh token).

The forum has a simple protection against bot accounts in the form of the need to confirm the created account using the e-mail address provided during the registration process. Until that moment, the account will be inactive.

Other implemented functionalities include:
- auto logout function after the refresh token / ban time expires,
- scroll function to the last post added in the topic.

## Screenshots
![main_screen](https://user-images.githubusercontent.com/53697813/160442795-87399eb1-bab8-4c57-88b4-988d467aded3.png)

![sign_up](https://user-images.githubusercontent.com/53697813/160447302-000c0037-1cf6-496b-b11e-6e305d80e796.png)

![sign_in](https://user-images.githubusercontent.com/53697813/160652446-801d94ef-9519-435c-995e-646dfed508f7.png)

![category_programming](https://user-images.githubusercontent.com/53697813/160443157-d93e8adf-49f3-4bd0-99bb-d6d6c60dde10.png)

![new_topic](https://user-images.githubusercontent.com/53697813/160443442-d32b63d0-6229-4adf-9316-7f0fd106a76a.png)

![account](https://user-images.githubusercontent.com/53697813/160443710-0364e569-1626-405b-81d1-90f13a50470f.png)

![avatar_change](https://user-images.githubusercontent.com/53697813/160444460-fc6fef32-608d-4b0c-a340-3393c7ae573f.png)

![list_of_topics](https://user-images.githubusercontent.com/53697813/160444699-5fecec50-6335-4b78-84ba-2b320c811599.png)

![ban_user](https://user-images.githubusercontent.com/53697813/160446407-dceb7bf5-8075-4368-aa5c-5c009c624f34.png)

![ban_user_info_websocket](https://user-images.githubusercontent.com/53697813/160446124-adf8e02c-a551-44ce-a775-b1bcd131c6d8.png)

![admin_panel](https://user-images.githubusercontent.com/53697813/160446809-4899937a-c936-42fe-982e-edb971c53024.png)

![no_such_topic](https://user-images.githubusercontent.com/53697813/160447059-0a92dcbd-ae38-4e57-bcf3-801d55173c87.png)

## Improvements
It is possible to add new functionalities / improvements to the application, such as: 
- use skeleton loader when fetching data, 
- reuse PostListComponent in UserProfileSettingsPostListComponent (it is practically the same HTML/CSS code and using it in the mentioned component would prevent code duplication), the same applies to TopicListComponent and UserProfileSettingsTopicListComponent,
- improve the view of some application components on small screen devices (better use of bootstrap mesh).
