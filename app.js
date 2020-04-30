const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

let posts = [];

app.get('/', (req, res) => {
    res.render('home', {post: posts});
})

app.get("/compose", (req, res) => {
    res.render("compose");
})

app.post("/compose", (req, res) => {
    let now = new Date();
    const post = {
      title: req.body.postTitle,
      body: lodash.truncate(req.body.postBody, {'length': 100}),
      fullbody: req.body.postBody,
      username: "Anonymous",
      time: now,
      commentNumber: 0,
      comment: []
    }
    posts.push(post);
    res.redirect("/");
})

app.get('/post/:entry', (req, res) => {
    for (let x in posts) {
      if (lodash.lowerCase(req.params.entry) == lodash.lowerCase(posts[x].title)) {
        res.render("post", {
            title: posts[x].title,
            body: posts[x].fullbody,
            username: posts[x].username,
            time: posts[x].time,
            commentNumber: posts[x].commentNumber,
            comment: posts[x].comment,
            parameter: req.url});
      }
    }
})

app.post('/post/:entry', (req, res) => {
    for (let x in posts) {
        if (lodash.lowerCase(req.params.entry) == lodash.lowerCase(posts[x].title)) {
            let now = new Date();
            const comment = {
                user: "Anonymous",
                body: req.body.commentBody,
                time: now,
                reply: []
            }
            posts[x].comment.push(comment);
            console.log(posts[x].comment);
            res.redirect(req.url);
        }
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})