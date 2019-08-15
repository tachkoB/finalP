const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const bc = require("./utils/bc");
const csurf = require("csurf");
const cookieSession = require("cookie-session");
const config = require("./config");
const s3 = require("./s3");
const mtg = require('mtgsdk');

app.use(
    cookieSession({
        secret: "I am always angry",
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);
app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});
app.use(require("body-parser").json());

app.use(express.static("./public"));

app.use(compression());

var multer = require("multer");
var uidSafe = require("uid-safe");
var path = require("path");

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}
app.get("/", (req, res) => {
    if (req.session.userId) {
        res.redirect("/play");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("/fetchingcards", (req, res)=>{
    mtg.card.where({ setName: 'Dominaria' })
        .then(cards => {

            console.log("logging the sets: ", cards[0].name);
            console.log("logging the length: ", cards.length);
            for(let i = 0; i<=cards.length; i++) {
                console.log("this is the card name list: ", cards[i].name);
            }
        })
        .catch(err=>{
            console.log("error in getting sets: ", err.message);
        });
});

app.get("/cards", (req, res)=>{

    let filteredCards = scryfall.filter(function(v){
        return v.legalities.standard==='legal';
    });
    let arrOfPromises = filteredCards.map(card => {
        return db.addCard(card.name);
    });
    console.log("this is the arr of promises:",  arrOfPromises);
    Promise.all(arrOfPromises).then(()=> {
        console.log("it worked bae");
    });
});


app.get("/searchCards/:str.json", (req, res) => {
    console.log("the req params string: ", req.params.str);
    db.findCard(req.params.str)
        .then(results => {
            console.log(
                "results from searching a card in route: ",
                results.rows[0].name
            );
            let result = results.rows[0].name;
            res.json({ result });
        })
        .catch(err => {
            console.log("error in searching for cards by name: ", err.message);
        });
});

app.get("/logout", (req, res)=>{
    req.session=null;
    res.redirect("/welcome");
});

app.get("/users", (req, res) => {
    db.getUser(req.session.userId)
        .then(results => {
            console.log("the results from getting user: ", results.rows[0]);
            res.json({
                data: results.rows[0],
                success: true
            });
        })
        .catch(err => {
            console.log("getting user info error: ", err.message);
        });
});

app.get("/getDecks", (req, res)=>{
    db.getDecks(req.session.userId).then(results=>{
        console.log("results from getting the decks: ", results.rows);
        var x = results.rows;
        var ratio = x.map(function(el) {
            if(el.winncount==0 || el.losscount ==0){
                el.ratio = 100 +"%";
            } 
            else {el.ratio =  el.wincount/(el.wincount +el.losscount)*100+"%";
                console.log("yo: ", ratio); 
            }
            return el;
        });
        res.json({
            data:ratio
        });
        
    });
});

//DO NOT DELTE THIS sendFile
app.get("*", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {


    bc.hashPassword(req.body.password)
        .then(hash => {
            db.addUser(req.body.first, req.body.last, req.body.email, hash)
                .then(resp => {
                    req.session.userId = resp.rows[0].id;
                    console.log(req.session.userId);
                    res.json({
                        data: resp.rows[0],
                        success: true
                    });
                })
                .catch(err => {
                    console.log("error in add user", err);
                    res.json({
                        success: false
                    });
                });
        })
        .catch(err => {
            console.log("error in hash password", err.message);
            res.json({
                success: false
            });
        });
});

app.post("/login", (req, res) => {
    db.getEmail(req.body.email)
        .then(results => {
            bc.checkPassword(req.body.password, results.rows[0].password).then(
                matched => {
                    if (matched) {
                        req.session.userId = results.rows[0].id;
                        res.json({
                            data: results.rows[0],
                            success: true
                        });
                    } else {
                        res.json({
                            success: false
                        });
                    }
                }
            );
        })
        .catch(err => {
            console.log("error in the pw", err.message);
            res.json({
                success: false
            });
        });
});

app.post("/newdeck", (req, res)=>{
    console.log("my id", req.session.userId);
    let maincards = req.body.mainboard;
    let sidecards = req.body.sideboard;
    console.log("I need to check if this is alright: ", req.body.deckname, req.session.userId);

    db.addDeckName(req.body.deckname, req.session.userId).then(results=>{
        let pass = results.rows[0].id;
        maincards.forEach((el)=>{
            db.addMainboard(el.maincard, el.cardnr, pass);
        });
        sidecards.forEach((el)=>{
            db.addSideboard(el.sidecard, el.cardnrtwo, pass);
        });
        res.json(null);
    }).catch(err=>{
        console.log("the error in adding the deck: ", err.message);
    });
});

app.post("/win", (req, res)=>{
    console.log("there should be the id of the deck:", req.body.deckid);
    db.addWin(req.body.deckid).then(results=>{
        console.log("the results from adding a win: ", results);
        res.json(null);
    })
        .catch(err=>console.log("error in adding win: ", err.message));
});

app.post("/loss", (req, res)=>{
    console.log("there should be the id of the deck:", req.body.deckid);
    db.addLoss(req.body.deckid).then(results=>{
        console.log("the results from adding a loss: ", results);
        res.json(null);
    })
        .catch(err=>console.log("error in adding loss: ", err.message));
});



app.listen(8080, function() {
    console.log("I'm listening.");
});

//node bundle-server.js

// x.forEach((el)=>{
//     if(el.winncount==0 || el.losscount ==0){
//         el.ratio = 100;
//     } 
//     else {el.ratio =  el.wincount/(el.wincount +el.losscount)*100;
//         console.log("yo: ", x); 
//     }
// });