
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const lyricsFinder = require("lyrics-finder")
const SpotifyWebApi = require("spotify-web-api-node")

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: "http://localhost:3000/refresh",
    clientId:"f252c245672f40d9897e21c56e9e1c89",
    clientSecret: "c8b8dfec0cab451b9b2a4b50a60b72ee",
    refreshToken,
  })

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post("/login", (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri:"http://localhost:3000/login",
    clientId: "f252c245672f40d9897e21c56e9e1c89",
    clientSecret:"c8b8dfec0cab451b9b2a4b50a60b72ee",
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      res.sendStatus(400)
    })
})

app.get("/lyrics", async (req, res) => {
  const lyrics =
    (await lyricsFinder(req.query.artist, req.query.track)) || "No Lyrics Found"
  res.json({ lyrics })
})

app.listen(3001)
/*const express = require("express")
const SpotifyWebApi = require("spotify-web-api-node")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express();
app.use(cors())
app.use(bodyParser.json())
console.log("Hello")
app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        REDIRECT_URI: "http://localhost:3000/auth/spotify/success",
        CLIENT_ID: "f252c245672f40d9897e21c56e9e1c89",
        CLIENT_SECRET: "c8b8dfec0cab451b9b2a4b50a60b72ee",
      refreshToken,
    })
    spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})
app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        REDIRECT_URI: "http://localhost:3000/auth/spotify/success",
        CLIENT_ID: "f252c245672f40d9897e21c56e9e1c89",
        CLIENT_SECRET: "c8b8dfec0cab451b9b2a4b50a60b72ee",
    })

    spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      })
    })
    .catch(err => {
        console.log(err)
        res.sendStatus(400)
      })
})

app.listen(3001)*/
