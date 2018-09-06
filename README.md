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

![interpreter-assistant-erd](https://media.git.generalassemb.ly/user/11650/files/a580c60a-b1c7-11e8-8cda-b39a72f42151)

### Challenges Faced / Problem Solving Strategies

This project streched me in the sense that it involved nested collections. Learning how to set up the routes and then implementing it correctly on the client side involved becoming more comfortable with Mongoose and MongoDB. Reading the documentation, Gooogle searches and the network of fellow GA students were my go-to resources. I also used GA's issue tracker and received guidance from instructors. The issue tracker was especially helpful as a "rubber-ducking" technique as often times hitting the submit button on a well-detailed issue I was facing was enough to get me on the right path to a solution. Middle-of-the-night solutions came in handy too!

### Unsolved Problems / Future Plans

I plan on adding a disease schema that will have collection documents in English and Spanish so the app becomes even more of a preparation tool for interpreters. Once a new MVP that incorporates this additional feature, and the client side is made more user-friendly, I plan to test it at Dana Farber. There will be at least 2-3 of us who would test the app under real-life conditions.