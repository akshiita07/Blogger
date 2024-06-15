//npm init         then        npm i express ejs body-parser axios
import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';
import ejs from 'ejs';

//SERVER WILL MAKE API REQUESTS

const app = express();
const port = 3000;

//api is running on port 4000 so add api url
const APIurl = 'http://localhost:4000/blogPosts'

app.use(express.static('public'));  //to use css from public folder

//bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//render home page
app.get('/', async (req, res) => {
    try {
        const response = await axios.get(APIurl);
        // console.log(response);
        res.render('index.ejs', {
            blogPosts: response.data
        });
    } catch (error) {
        res.status(500);
        res.json("Error fetching post");
    }
})

//render new post page:
app.get('/new', (req, res) => {

    res.render('newpost.ejs', {
        newpostheading: "New Post",
        newpostbutton: "Create Post"
    });
});

//render edit post page:
app.get('/edit/:id', async (req, res) => {
    try {
        const response = await axios.get(`${APIurl}/${req.params.id}`);
        // console.log(req.params.id);
        // console.log(response.data);
        res.render('newpost.ejs', {
            newpostheading: "Edit Post",
            newpostbutton: "Update Post",
            blogData: response.data,
        });
    } catch (error) {
        res.status(500);
        res.json("Error fetching post");
    }
})

//new post
app.post('/blogPosts', async (req, res) => {
    try {
        const response = await axios.post(`${APIurl}`, req.body);
        // console.log(response.data);
        res.redirect('/');
    } catch (error) {
        res.status(500);
        res.json("Error creating new post");
    }
});

//update post
app.post('/editPost/:id', async (req, res) => {
    try {
        const response = await axios.patch(`${APIurl}/${req.params.id}`, req.body);
        // console.log(response.data);
        res.redirect('/');
    } catch (error) {
        res.status(500);
        res.json("Error updating post");
    }
});

//delete post
app.post('/delete/:id', async (req, res) => {
    try {
        const response = await axios.delete(`${APIurl}/${req.params.id}`);
        // console.log(response.data);
        res.redirect('/');
    } catch (error) {
        res.status(500);
        res.json("Error deleting post");
    }
});

app.listen(port, () => {
    console.log(`Backend server is running on port ${port}`)
})