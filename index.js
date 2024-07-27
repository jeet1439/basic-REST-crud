// const { log } = require("console");
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); 

const methodOverride = require('method-override');
app.use(methodOverride('_method'));
let posts =  [
    {   
        id: uuidv4(),
        username:"jeet",
        content: "i love coding"
    },
    {   
        id: uuidv4(),
        username:"sourav",
        content: "i love ml"
    },
    {   
        id: uuidv4(),
        username:"anik",
        content: "i love mern"
    }
]
app.get("/", (req, res)=>{
    res.send("this is the route");
});
app.get("/posts", (req, res)=>{
    res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
});
app.post("/posts",(req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push( { id, username, content });
//   console.log(req.body);
//   res.send("post request working");
     res.redirect("/posts");
})

app.get("/posts/:id", (req, res)=>{
    let { id } = req.params;
    // console.log(id);
    let post = posts.find((p) => id === p.id); 
    // console.log(post);
    // res.send("req working");
    res.render("show.ejs", {post});
});
app.patch("/posts/:id" , (req, res) =>{
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    // res.send("patch req working: ");
    res.redirect("/posts");
})
app.get("/posts/:id/edit", (req, res) =>{
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post});
})

app.delete("/posts/:id", (req, res) =>{
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);//filter the whole array where 
    //res.send("delete success");                   the id is not equal to the selected id
    res.redirect("/posts");
});
app.listen(port, ()=>{
    console.log(`listening to port ${port}`);
});
