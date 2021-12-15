const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
})

server.get("/", function(req, res){
  const about = {
    avatar: "https://scontent.frec7-1.fna.fbcdn.net/v/t1.6435-9/167989111_302222057931305_2439688314102419814_n.jpg?_nc_cat=1&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeGEAU0gJH4iLgEFvzvMzI0pHNgbcwj4-lUc2BtzCPj6VQ-DjaM4-zYLC9YdP5dUl3mbaG6NDjgn2cBSvZri2YmY&_nc_ohc=BZIv9RGPNJMAX8israX&tn=UUFnOMbSTJFVKz5p&_nc_ht=scontent.frec7-1.fna&oh=1549972451153c0289ebc47480ae1fd8&oe=6198D74D",
    name: "Nicole Diretora",
    role: "🎮 Streamer do Faceboook Gaming & Youtuber",
    description: "Jogo Alguns games aqui nas lives. Curta minhas redes para não perder!",
    links: [
      { name: "Instagram", url: "https://instagram.com/nicolediretora" },
      { name: "Facebook", url: "https://facebook.com/NicoleDiretora/" },
      { name: "Youtube", url: "https://www.youtube.com/nicolediretora" }
    ]
  }
  return res.render("about", { about })
})

server.get("/projects", function(req, res){
  return res.render("projects", { itens: videos })
})

server.get("/video", function(req, res) {
  const id = req.query.id

  const video = videos.find(function(video){
    return video.id == id
  })

  if (!video) {
    return res.send("Video not found!")
  }

  return res.render("video", { item: video })
})

server.listen(5000, function(){
  console.log('Server is running')
})