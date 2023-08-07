# My API

The goal of this project is to put my backend skills to the test when it comes to developing and implementing a complete CRUD for a music-oriented REST API, which has 4 models made with Prisma. These models are named: Songs, Users, Artists and Albums. In the following lines of this README.md, i will be providing the endpoints for creating, reading, updating and deleting data from the database. for all the requests, you need to login as an admin and use the token provided by the backend side. This token must be inserted into the header of the request as an authorization. Otherwise, you won't be able to access the resource. 

## Users (endpoint)

GET/POST ----> http://0.0.0.0:3000/api/users

You can use the /users endpoint to:

retrieve all the users in the database. You can see if the users have a song from the database marked as favorite

<img src = "img/getUsers.png" alt= "getUsers request code"  width = 700>

<img src = "img/getUsersRequest.png" alt= "getUsers request" width = 700>

A user can also be registered within this endpoint:

<img src = "img/register.png" alt= "register code" width = 700>

<img src = "img/registerRequest.png" alt= "register request" width = 700>

## Auth/login (endpoint)

POST ----> http://0.0.0.0:3000/api/auth/login

The auth/login endpoint serves as an authentication step for the user to enter the app. You will be given a token and a refresh token in case the access token expires:

<img src = "img/login.png" alt= "login request code"  width = 700>

<img src = "img/loginRequest.png" alt= "login request" width = 700>


## Users/id (endpoint)

GET/PUT/DELETE ----> http://0.0.0.0:3000/api/users/{id}

You can use the /users/{id} endpoint to:

Get specific users according to the id sent as a parameter. You can see if the user has a song from the database marked as favorite:

<img src = "img/getUserById.png" alt= "getUserById request code"  width = 700>

<img src = "img/getUserByIdRequest.png" alt= "getUsers request" width = 700>

Update a user information, whether is changing the name, genre, or duration. The user can also "mark a song as favorite" by connecting to an existing one in the database. 

<img src = "img/updateUser.png" alt= "UpdateUser request code"  width = 700>

<img src = "img/updateUserRequest.png" alt= "updateUser request" width = 700>

Apply a soft delete to a user from the database:

<img src = "img/deleteUser.png" alt= "deleteUser request code"  width = 700>

<img src = "img/deleteUserRequest.png" alt= "deleteUser request" width = 700>


## Songs (endpoint)

GET/POST ----> http://0.0.0.0:3000/api/songs

You can use the /songs endpoint to:

retrieve all the songs in the database. You can see from which album is the song and the users who marked it as a favorite.

<img src = "img/getSongs.png" alt= "getSongs request code"  width = 700>

<img src = "img/getSongsRequest.png" alt= "getSongs request" width = 700>

A song can also be created within this endpoint. However, there must be an artist created before creating the song, as both songs and albums are linked to the artist. The id in the code corresponds to the artist who made the song and who is currently in the database. 

<img src = "img/createSong.png" alt= "createSong request code" width = 700>

<img src = "img/createSongRequest.png" alt= "createSong request" width = 700>

## Songs/id (endpoint)

GET/PUT/DELETE ----> http://0.0.0.0:3000/api/songs/{id}

You can use the /songs/{id} endpoint to:

Get specific songs according to the id sent as a parameter. You can see the albums where the song is included and the users that marked it as favorite:

<img src = "img/getSongById.png" alt= "getSongById request code"  width = 700>

<img src = "img/getSongByIdRequest.png" alt= "getSongById request" width = 700>

Update a song, whether is changing the name, genre, or duration. You can also connect the song to an already existing album within the database.

<img src = "img/updateSong.png" alt= "UpdateSong request code"  width = 700>

<img src = "img/updateSongRequest.png" alt= "updateSong request" width = 700>

Apply a soft delete to a song from the database:

<img src = "img/deleteSong.png" alt= "deleteAlbum request code"  width = 700>

<img src = "img/deleteSongRequest.png" alt= "deleteAlbum request" width = 700>

## Artists (endpoint)

GET/POST ----> http://0.0.0.0:3000/api/artists

You can use the /artists endpoint to:

retrieve all the artists in the database. You can see the songs and the albums linked to each artist. 

<img src = "img/getArtists.png" alt= "getArtists request code"  width = 700>

<img src = "img/getArtistsRequest.png" alt= "getArtists request" width = 700>

You can also create an artist within this endpoint. Optionally, you can add the songs and albums from the artist in the query. To create only the artist, you can remove the queries that include the songs and albums.

<img src = "img/createArtist.png" alt= "createArtist request code" width = 700>

<img src = "img/createArtistRequest.png" alt= "createArtist request" width = 700>

## Artists/id (endpoint)

GET/PUT/DELETE ----> http://0.0.0.0:3000/api/artists/{id}

You can use the /artists/{id} endpoint to:

Get specific artists according to the id sent as a parameter. You can see the albums and songs associated with the artist

<img src = "img/getArtistById.png" alt= "getArtistById request code"  width = 700>

<img src = "img/getArtistByIdRequest.png" alt= "getArtistById request" width = 700>

Update an artist, whether is adding new songs/albums or connecting the ones that already exist within the database, changing the name and/or nationality.

<img src = "img/updateArtist.png" alt= "updateArtist request code"  width = 700>

<img src = "img/updateArtistRequest.png" alt= "updateArtist request" width = 700>

Apply a soft delete to an artist from the database:

<img src = "img/deleteArtist.png" alt= "deleteteArtist request code"  width = 700>

<img src = "img/deleteArtistRequest.png" alt= "deleteArtist request" width = 700>

## Albums (endpoint)

GET/POST ----> http://0.0.0.0:3000/api/albums

You can use the /albums endpoint to:

retrieve all the albums in the database. You can see the songs included in the album and the artist that made it.

<img src = "img/getAlbums.png" alt= "getAlbums request code"  width = 700>

<img src = "img/getAlbumsRequest.png" alt= "getAlbums request" width = 700>

An album can also be created within this endpoint. However, there must be an artist created before creating the album, as both songs and albums are linked to each artist. The id in the code corresponds to the artist who made the song and who is currently in the database. It also adds a song to the album.

<img src = "img/createAlbum.png" alt= "createAlbum request code" width = 700>

<img src = "img/createAlbumRequest.png" alt= "createAlbum request" width = 700>

## Albums/id (endpoint)

GET/PUT/DELETE ----> http://0.0.0.0:3000/api/albums/{id}

You can use the /albums/{id} endpoint to:

Get specific albums according to the id sent as a parameter. You can see the songs and artist related to the album.

<img src = "img/getAlbumById.png" alt= "getAlbumById request code"  width = 700>

<img src = "img/getAlbumByIdRequest.png" alt= "getAlbumById request" width = 700>

Update an album, whether is adding new songs or connecting songs that already exist within the database, changing the name and/or release date.

<img src = "img/updateAlbum.png" alt= "updateAlbum request code"  width = 700>

<img src = "img/updateAlbumRequest.png" alt= "updateAlbum request" width = 700>

Apply a soft delete to an album from the database:

<img src = "img/deleteAlbum.png" alt= "deleteAlbum request code"  width = 700>

<img src = "img/deleteAlbumRequest.png" alt= "deleteAlbum request" width = 700>

These are the folders and files i've used for my project:

<img src = "image-4.png" alt = "Folders and files">

## Built with

- Bcrypt
- Dotenv
- NodeJS
- ESLint
- ExpressJS
- ExpressJWT
- Joi
- JSONWebToken
- NodeJS
- PostgreSQL
- Prisma

## Created by

[![Axel Roitstein](https://avatars.githubusercontent.com/u/134340911?v=4)](https://github.com/axelroitstein)

[Axel Roitstein](https://github.com/axelroitstein)








