const express = require('express');
var app = express();
var hbs = require('hbs');
var fs = require('fs');

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



app.use((req, res, next) => {
    let now = new Date().toString();
    console.log(req);
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile(
        'server.log', log + '\n', (error) => {
            if (error) {
                console.log("Unable to log server messages");
            }
        }
    );
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs', {
        pageTitle: "Site Down",
        downtimeMessage: "Website is down for maintainance. Please come back after some time."
    });
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear() + ' A.D.';
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express!!</h1>');
    console.log("Serving home page request...");
    res.render('home.hbs', {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to this Node website."
    });
});

app.get('/about', (req, res) => {
    res.render("about.hbs", {
        pageTitle: "About Page"
    });
});

app.get('/bad', (req, res) => {
    //res.send('<h1>Hello Express!!</h1>');
    res.send({
        errorMessage: 'Bad Request.'
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});