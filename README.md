## A data store API for users of the Interpreter Assistant app

The Interpreter Assistant app is my capstone project for GA's Web Development Immersive class. It is a SPA that allows interpreters  to better prepare for their interpreting assignment by finding information about the providers for whom they interpret and by writing preparation and/or debriefing notes about their encounters. The user, once registered, can create session notes, can see all her notes in a list or one at a time, can update sessions notes, and can delete them. The design and development process began with user stories, wireframes, and ERDs. Then the back end was implemented and the CRUD actions tested with curl scripts and/or through Postman. Finally, I linked the front end to this API.

### Related Links

[Interpreter Assistant Deployed App](https://beatrizelena.github.io/interpreter-assistant-client/)

[Interpreter Assistant Deployed Backend](https://interpreter-assistant.herokuapp.com/)

[Interpreter Assistant Frontend Repository](https://github.com/BeatrizElena/interpreter-assistant-client)

### API End Points

| Verb   | URI Pattern            | Routes |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| DELETE | `/sign-out`            | `users#signout`   |
| PATCH  | `/change-password`     | `users#changepw`  |
| GET    | `/sessions`            | `sessions#index`  |
| POST   | `/sessions`      | `sessions#create` |
| GET    | `/sessions/:id`        | `sessions#show` |
| PATCH  | `/sessions/:id`        | `sessions#update` |
| DELETE                 | `/sessions/:id`                                          | `sessions#delete` |
| GET                    | `/doctors`                                               | `doctors#index`   |
All data returned from API actions is formatted as JSON.
### Technologies/Tools Used

Express

Mongoose

MongoDB

NodeJS

Postman



### ERDs

![interpreter-assistant-erd](/Users/beatriz/wdi/projects/project4/readyInterpreter-api/images/45166119-4b4f6180-b1c4-11e8-9be2-d3415b3276b9.png)

