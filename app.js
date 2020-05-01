//set-up of server
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const data = require(__dirname + "/data.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

//server
let dataStructure = data.dataConstruct();//data structure

// MAIN PAGE

app.get('/', (req, res) => { //main page
    res.render('home', {data: dataStructure});
})

app.post('/', (req, res) => {
    let topic = req.body.topicTitle;
    let descript = req.body.topicDes;
    data.postTopic(dataStructure, topic, descript);
    res.redirect("/");
})

//TOPIC

app.get('/:topic', (req, res) => { //load topic page
    for (let x in dataStructure) {
      if (lodash.lowerCase(req.params.topic) == lodash.lowerCase(dataStructure[x].topic)) { //if title of post= url parameter
        dataStructure[x].views++;
        res.render("topic", data.renderTopicData(dataStructure, x, req.url));
      }
    }
})

app.post('/:topic', (req, res) => { //insert data through topic page
    for (let x in dataStructure) {
      if (lodash.lowerCase(req.params.topic) == lodash.lowerCase(dataStructure[x].topic)) { //if title of post= url parameter
        let title = req.body.postTitle;
        let body = req.body.postBody;
        data.postData(dataStructure[x].posts, title, body);
        dataStructure[x].postNumber += 1;
        res.redirect(req.url);
      }
    }
})

//POSTS

app.get('/:topic/posts/:post', (req, res) => {//load posts page of topic
    for (let x in dataStructure) {
        for (let y in dataStructure[x].posts) {
            if (lodash.lowerCase(req.params.post) == lodash.lowerCase((dataStructure[x].posts)[y].title)) {
                (dataStructure[x].posts)[y].views++;
                res.render("post", data.renderPostData(dataStructure[x].posts, y, req.url));
            }
        }
    }
})

app.post('/:topic/posts/:post', (req, res) => {//insert data through post page
    for (let x in dataStructure) {
        for (let y in dataStructure[x].posts) {
            if (lodash.lowerCase(req.params.post) == lodash.lowerCase((dataStructure[x].posts)[y].title)) {
                let comment = req.body.commentBody;
                data.commentData(dataStructure[x].posts, y, comment);
                (dataStructure[x].posts)[y].commentNumber += 1;
                res.redirect(req.url);
            }
        }
    }
})

//LISTEN

app.listen(PORT, () => { //listen for the server
    console.log(`Server is running on port ${PORT}`);
})

