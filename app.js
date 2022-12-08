const express = require('express')
const app = express()
const sessions = require('express-session')


app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
  });

app.use(sessions({
    resave: true,
    saveUninitialized: true,
    secret: 'secretpassword',
}))

const user ={
    email: 'admin@gmail.com',
    passwd: '12345'
}
let users = "admin";
let port = 6400;


app.get('/', (req, res) => {
    if(req.session.user){
        res.render('index', { users },)
    }
    else{
        res.render('login')
    }
   
})
app.post('/', (req, res) => {
    if (req.body.email === user.email && req.body.passwd === user.passwd) {
        req.session.user = req.body.email;
        console.log('session created')
        res.redirect('/home')
    }
    else {
        res.render('login', { wrong: "Invalid username or Password" })
    }
})

app.get('/home',(req,res) => {
    if(req.session.user) {
        res.render('index', { users },)
    }
    else {
        res.redirect('/')
    }


})
app.get('/logout', (req, res) => {
    req.session.destroy()
    console.log('session ends')
    res.redirect('/');
    res.end();
    

}
)

app.listen(6400, () => console.log(`server is running at port ${port}`)

)


