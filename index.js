//npm init         then        npm i express ejs body-parser axios
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import ejs from 'ejs';

const app = express();
const port = 4000;  //for api as 3000 for server

//RESPONDS TO ACTUAL API REQUEST FROM SERVER

app.use(express.static('public'));  //to use css from public folder

//bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//CHALLENGE 1: GET All posts
app.get('/blogPosts', function (req, res) {
    // console.log(blogPosts);
    res.json(blogPosts);
});

//CHALLENGE 2: GET a specific post by id
app.get('/blogPosts/:id', function (req, res) {
    var userId = req.params.id;
    // console.log(userId);              //it returns id as string
    //so convert this string to int
    userId = parseInt(userId);

    //to find post use JS array.find(fnc) method that returns true/false
    const post = blogPosts.find(function checkPostId(blog) {
        return userId === blog.id;
    })

    if (!post) {
        res.status(404);
        res.json({
            error: "Such index not found for blogs"
        });
    }
    res.json(post);
});

//CHALLENGE 3: POST a new post
app.post('/blogPosts', function (req, res) {
    //create  a new blog object:
    const newBlog = {
        id: blogPosts.length + 1,    //1 addition
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        date: new Date(),
    };

    //push new blog into blogPosts array:
    blogPosts.push(newBlog);
    res.status(201);
    res.json(newBlog);
});

//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch('/blogPosts/:id', function (req, res) {
    //EDIT blogs text n type by specifying id:
    var userId = req.params.id;   //returns string so parse into int
    userId = parseInt(userId);

    const blogId = blogPosts.find(function checkJokeId(blog) {
        return userId === blog.id;
    })

    if (req.body.title) {

        blogId.title = req.body.title;//updated joke
    }
    else {
        blogId.title;//existing joke
    }
    if (req.body.content) {

        blogId.content = req.body.content;//updated joke
    }
    else {
        blogId.content;//existing joke
    }
    if (req.body.author) {

        blogId.author = req.body.author;//updated joke
    }
    else {
        blogId.author;//existing joke
    }
    blogId.date=new Date();

    res.json(blogId);
});

//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete('/blogPosts/:id', function (req, res) {
    //delete specific joke by specifying id:
    var userId = req.params.id;   //returns string so parse into int
    userId = parseInt(userId);

    //find Index method
    const blogId = blogPosts.findIndex(function checkJokeId(blog) {
        return userId === blog.id;
    })

    if (blogId > -1) {
        //to remove elements from array: .splice(index,no of elements to be removed)
        blogPosts.splice(blogId, 1);
        res.sendStatus(200);    //successful delete
        res.json({
            message: `Blog with id= ${blogId} deleted!`
        });
    }
    else {
        res.status(404);
        res.json({
            error: `Error while searching for index with id= ${blogId}. No blog deleted!`
        });
    }
});

app.listen(port, () => {
    console.log(`API server is running on port ${port}`)
})

//array of all posts
let blogPosts = [
    {
        id: 1,
        title: "The Rise of Decentralized Finance",
        content:
            "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
        author: "Alex Thompson",
        date: new Date(),
    },
    {
        id: 2,
        title: "The Impact of Artificial Intelligence on Modern Businesses",
        content:
            "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
        author: "Mia Williams",
        date: new Date(),
    },
    {
        id: 3,
        title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
        content:
            "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
        author: "Samuel Green",
        date: new Date(),
    },
];