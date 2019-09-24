const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const bc = require("./utils/bc");
const csurf = require("csurf");
const cookieSession = require("cookie-session");
const config = require("./config");
// const s3 = require("./s3");
// const scryfall = require("./scryfall-default-cards");

app.use(
    cookieSession({
        secret: "I am always angry",
        maxAge: 1000 * 60 * 60 * 24 * 365 * 100
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

var uidSafe = require("uid-safe");
var path = require("path");

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
        res.redirect(__dirname + "/index.html");
    }
});

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("/searchCards/:str.json", (req, res) => {
    db.findCard(req.params.str)
        .then(results => {
            let result = results.rows[0].name;
            res.json({ result });
        })
        .catch(err => {
            console.log("error in searching for cards by name: ", err.message);
            res.json(null);
        });
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.get("/users", (req, res) => {
    db.getUser(req.session.userId)
        .then(results => {
            res.json({
                data: results.rows[0],
                success: true
            });
        })
        .catch(err => {
            console.log("getting user info error: ", err.message);
        });
});

app.get("/getDecks", (req, res) => {
    db.getDecks(req.session.userId).then(results => {
        var x = results.rows;
        var ratio = x.map(function(el) {
            if (el.wincount == 0 && el.losscount == 0) {
                el.ratio = "Go get 'em";
            } else {
                let xy = (el.wincount / (el.wincount + el.losscount)) * 100;
                el.ratio = Math.round(xy) + `% Win rate`;
            }
            return el;
        });
        res.json({
            data: ratio
        });
    });
});

app.get(`/getDeck/:id.json`, (req, res) => {
    console.log("is this even happening?", req.params.id);
    db.getDeck(req.params.id).then(({ rows: results }) => {
        console.log("results from getting the deck before editing: ", results);
    });
});

//DO NOT DELTE THIS
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

app.post("/newdeck", (req, res) => {
    console.log("my id", req.session.userId);
    let maincards = req.body.mainboard;
    let sidecards = req.body.sideboard;
    console.log(
        "I need to check if this is alright: ",
        req.body.deckname,
        req.session.userId
    );

    db.addDeckName(req.body.deckname, req.session.userId)
        .then(results => {
            let pass = results.rows[0].id;
            maincards.forEach(el => {
                db.addMainboard(el.maincard, el.cardnr, pass);
            });

            res.json(null);
        })
        .catch(err => {
            console.log("the error in adding the deck: ", err.message);
        });
});

app.get("/linky", (req, res) => {
    res.json(null);
});

app.post("/win", (req, res) => {
    console.log("there should be the id of the deck:", req.body.deckid);
    db.addWin(req.body.deckid)
        .then(results => {
            console.log("the results from adding a win: ", results);
            res.json(null);
        })
        .catch(err => console.log("error in adding win: ", err.message));
});

app.post("/loss", (req, res) => {
    console.log("there should be the id of the deck:", req.body.deckid);
    db.addLoss(req.body.deckid)
        .then(results => {
            console.log("the results from adding a loss: ", results);
            res.json(null);
        })
        .catch(err => console.log("error in adding loss: ", err.message));
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

// var diskStorage = multer.diskStorage({
//     destination: function(req, file, callback) {
//         callback(null, __dirname + "/uploads");
//     },
//     filename: function(req, file, callback) {
//         uidSafe(24).then(function(uid) {
//             callback(null, uid + path.extname(file.originalname));
//         });
//     }
// });

// var uploader = multer({
//     storage: diskStorage,
//     limits: {
//         fileSize: 2097152
//     }
// });

// app.get("/cards", (req, res) => {
//     let filteredCards = scryfall.filter(function(v) {
//         return v.legalities.standard === "legal";
//     });
//     let arrOfPromises = filteredCards.map(card => {
//         return db.addCard(card.name);
//     });
//     console.log("this is the arr of promises:", arrOfPromises);
//     Promise.all(arrOfPromises).then(() => {
//         console.log("it worked bae");
//     });
// });
// var multer = require("multer");
