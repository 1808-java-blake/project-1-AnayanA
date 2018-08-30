import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';


// create app object from express
const app = express();

//sets the port
const port = 3000;
app.set('port', port);

const sess = {
    secret: 'keyboard cat',
    cookie: {secure: false},
    resave: false,
    saveUninitalized: false
};

if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
    sess.cookie.secure = true;
}

//register session middleware
app.use(session(sess));

//log the request being made
app.use((req, resp, next) => {
    console.log(`request made with path ${req.path} \n and type: ${req.method}`);
    next();
});

//allow static content to be served, navigating to url with nothing after
// will serve index.html from public
app.use(
    express.static(path.join(__dirname, 'public'))
);

//use the body parser to convert request json
app.use(bodyParser.json());

// allows cors headers
app.use((req, resp, next) => {
    next();
})

/*********************************************************************************************
 * API Routers
 ********************************************************************************************/
app.use('/users', userRouter);

const server = app.listen(port, () => {
    console.log('App is running at http://')
})