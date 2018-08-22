## A data store API for Users of Ready-Interpreter front End

This API stores data about doctors, clinics, and diseases that interpreters will find helpful to better prepare for their interpreting assignment and to debrief after session is over.

### API URL

```js
  development: '',
  production: 'https://ready-interpreter-api.herokuapp.com'
```
### API End Points

| Verb   | URI Pattern            | Routes |
|--------|------------------------|-------------------|
| POST   | `/sign-up`             | `users#signup`    |
| POST   | `/sign-in`             | `users#signin`    |
| DELETE | `/sign-out`            | `users#signout`   |
| PATCH  | `/change-password`     | `users#changepw`  |
| *For all other actions | *follow the same routing protocol as sessions & doctors* | *below* |
| GET    | `/sessions`            | `sessions#index`  |
| POST   | `/sessions`      | `sessions#create` |
| GET    | `/sessions/:id`        | `sessions#show` |
| PATCH  | `/sessions/:id`        | `sessions#update` |
| DELETE                 | `/sessions/:id`                                          | `sessions#delete` |
| GET                    | `/doctors`                                               | `doctors#index`   |
| POST                   | `/doctors`                                               | `doctors#create`  |
| GET                    | `/doctors/:id`                                           | `doctors#show`    |
| PATCH | `/doctors/:id` | `doctors#update` |
All data returned from API actions is formatted as JSON.
### API Guides

- [User Documentation](docs/user.md)
