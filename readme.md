

#UkrainizatorUA API
`UkrainizatorUA API`: it's API for opensource project where people can connect and translate games, films, TV show, anything.
#API
##Users
###Registration
Add new user to system, return user tokens, user data, set `refreshToken` in cookies
####Request
`POST /api/users/registration`
#####body
```json
{
    "email": "some@gmail.com",
    "password": "password"
}
```
####Response
```json
{
  "tokens": {
    "accessToken": "some token",
    "refreshToken": "some token"
  },
  "user": {
    "email": "some@gmail.com",
    "id": "6201740a2a55f1f489544108",
    "isActivated": false,
    "role": "user",
    "createdDate": "1644262405477"
  }
}
```

###Login
Return user tokens, user data, set `refreshToken` in cookies
####Request
`POST /api/users/login`
#####body
```json
{
    "email": "some@gmail.com",
    "password": "password"
}
```
####Response
```json
{
  "tokens": {
    "accessToken": "some token",
    "refreshToken": "some token"
  },
  "user": {
    "email": "some@gmail.com",
    "id": "6201740a2a55f1f489544108",
    "isActivated": false,
    "role": "user",
    "createdDate": "1644262405477"
  }
}
```

###Logout
Clear cookies
####Request
`POST /api/users/logout`

####Response
```json
{
  "message": "Success logout"
}
```
###Refresh
Return user tokens. Need `refreshToken` in cookies
####Request
`GET /api/users/refresh`

####Response
```json
{
  "tokens": {
    "accessToken": "some token",
    "refreshToken": "some token"
  },
  "user": {
    "email": "some@gmail.com",
    "id": "6201740a2a55f1f489544108",
    "isActivated": false,
    "role": "user",
    "createdDate": "1644262405477"
  }
}
```
###Get all users
Return users list. Need header `Authorization` and `"role": "admin"` 
####Request
`GET /api/users/all-users`

####Response
```json
[
  {
    "email": "some@gmail.com",
    "id": "6201740a2a55f1f489544108",
    "isActivated": false,
    "role": "admin",
    "createdDate": "1644262405477"
  },
  {
    "email": "some@gmail.com",
    "id": "6201749a2a55f1f48954410b",
    "isActivated": false,
    "role": "user",
    "createdDate": "1644262405477"
  }
]
```

###Get user
Return user data.
####Request
`GET /api/users/:userId`

####Response
```json
{
  "email": "some@gmail.com",
  "id": "6201740a2a55f1f489544108",
  "isActivated": false,
  "role": "admin",
  "createdDate": "1644262405477"
}
```

##Categories
###Create
Add new category. Need header `Authorization`
####Request
`POST /api/posts/categories/create`
#####body
```json
{
  "name": "Games"
}
```
####Response
```json
{
  "id": "6201740a2a55f1f489544108",
  "name": "Game",
  "author": "6201749a2a55f1f48954410b"
}
```
###Get all
Return all categories
####Request
`GET /api/posts/categories/`

####Response
```json
[
  {
    "id": "6201740a2a55f1f489544108",
    "name": "Games",
    "author": "6201749a2a55f1f48954410b"
  },
  {
    "id": "6201740a2a55f1f489544108",
    "name": "Films",
    "author": "6201749a2a55f1f48954410b"
  }
]
```

##Members
###Create
Creates a record of user participation in the project. Need header `Authorization`
####Request
`POST /api/posts/members/create`
#####body
```json
{
  "post": "61f0737f99b700502edb4390"
}
```
####Response
```json
{
  "id": "6201740a2a55f1f489544108",
  "post": "61f0737f99b700502edb4390",
  "user": "6201749a2a55f1f48954410b"
}
```
###Leave
Deletes a record of user participation in the project. Need header `Authorization`
####Request
`POST /api/posts/members/leave`
#####body
```json
{
  "post": "61f0737f99b700502edb4390"
}
```
####Response
```STATUS 200```

###Get all projects in which the user is a participant
Return all projects in which the user is a participant
####Request
`POST /api/posts/members/users-member`
#####body
```json
{
  "user": "61f0737f99b700502edb4390"
}
```
####Response
```json
[
  {
    "id": "6201740a2a55f1f489544108",
    "post": "61f0737f99b700502edb4390",
    "user": "6201749a2a55f1f48954410b"
  },
  {
    "id": "6201740a2a55f1f489544108",
    "post": "61f0737f99b700502edb4390",
    "user": "6201749a2a55f1f48954410b"
  }
]
```
###Get all projects members
Return all projects members
####Request
`POST /api/posts/members/post-members`
#####body
```json
{
  "post": "61f0737f99b700502edb4390"
}
```
####Response
```json
[
  {
    "id": "6201740a2a55f1f489544108",
    "post": "61f0737f99b700502edb4390",
    "user": "6201749a2a55f1f48954410b"
  },
  {
    "id": "6201740a2a55f1f489544108",
    "post": "61f0737f99b700502edb4390",
    "user": "6201749a2a55f1f48954410b"
  }
]
```

##Post
###Create
Creates new project. Need header `Authorization`
####Request
`POST /api/posts/post/create`
#####body
```json
{
  "header": "Songs of Syx",
  "description": "Songs of Syx game",
  "category": "61f33i599b700502edb438a",
  "language": "613u32c99b700502edb438d",
  "link": "https://crowdin.com/project/songs-of-syx/uk"
}
```
####Response
```json
{
  "id": "61f0737f99b700502edb4390",
  "header": "Songs of Syx",
  "description": "Songs of Syx game",
  "category": "61f33i599b700502edb438a",
  "language": "613u32c99b700502edb438d",
  "link": "https://crowdin.com/project/songs-of-syx/uk",
  "author": "6201749a2a55f1f48954410b"
}
```
###Get all
Return all projects.
####Request
`GET /api/posts/post/`

####Response
```json
[
  {
  "id": "61f0737f99b700502edb4390",
  "header": "Songs of Syx",
  "description": "Songs of Syx game",
  "category": "61f33i599b700502edb438a",
  "language": "613u32c99b700502edb438d",
  "link": "https://crowdin.com/project/songs-of-syx/uk",
  "author": "6201749a2a55f1f48954410b"
  },
  {
    "id": "6201749a2a55f1f48954410b",
    "header": "Another title",
    "description": "Title description",
    "category": "61f33i599b700502edb438a",
    "language": "613u32c99b700502edb438d",
    "link": "https://photobank.com/gamephoto.jpg",
    "author": "61f0737f99b700502edb4390"
  }
]
```

###Get post
Return post for id.
####Request
`GET /api/posts/post/:post`

####Response
```json
{
  "id": "61f0737f99b700502edb4390",
  "header": "Songs of Syx",
  "description": "Songs of Syx game",
  "category": "61f33i599b700502edb438a",
  "language": "613u32c99b700502edb438d",
  "link": "https://crowdin.com/project/songs-of-syx/uk",
  "author": "6201749a2a55f1f48954410b"
} 
```