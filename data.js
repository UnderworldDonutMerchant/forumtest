let lodash = require('lodash');

exports.dataConstruct = function() { //form main data structure
    return [
        {
        topic: "Anime",
        description: "Watch your favourite moe and shounen dramas today!",
        postNumber: 0,
        views: 0,
        posts: [] 
        },
        {
        topic: "Fitness",
        description: "Another day to pump iron and get shredded.",
        postNumber: 0,
        views: 0,
        posts: [] 
        },
        {
        topic: "Movie",
        description: "Watch the latest showings right now!",
        postNumber: 0,
        views: 0,
        posts: [] 
        }
    ];
}

//TOPIC

exports.postTopic = function(array, topic, des) {
    const insertTopic = {
        topic: topic,
        description: des,
        postNumber: 0,
        views: 0,
        posts: []
    }
    array.push(insertTopic);
}

exports.renderTopicData = function(array, index, parameter) { 
    return {
        topic: array[index].topic,
        postNumber: array[index].postNumber,
        posts: array[index].posts,
        parameter: parameter,
        views: array[index].views
    }
}

//POST

exports.postData = function(array, title, body, url) {//add posts into post array
    let now = new Date();
    const post = {
      title: title,
      body: lodash.truncate(body, {'length': 100}),
      fullbody: body,
      username: "Anonymous",
      time: now,
      commentNumber: 0,
      comment: [],
      views: 0
    }
    array.push(post);
}


exports.renderPostData = function(array, index, parameter) {
    return {
        title: array[index].title,
        body: array[index].fullbody,
        username: array[index].username,
        time: array[index].time,
        commentNumber: array[index].commentNumber,
        comment: array[index].comment,
        parameter: parameter,
        views: array[index].views
    }
}

//COMMENTS

exports.commentData = function(array, index, body) {//add comment into post
    let now = new Date();
    const comment = {
        user: "Anonymous",
        body: body,
        time: now,
        reply: []
    }
    array[index].comment.push(comment);
}


