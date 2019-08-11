const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./utils/db");
const bc = require("./utils/bc");
const csurf = require("csurf");
const cookieSession = require("cookie-session");

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
app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
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

//DO NOT DELTE THIS sendFile
app.get("*", (req, res) => {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    // const { first, last, email, password} = req.body;
    // try {
    //let hash = await bc.hashPasword(password);
    //let user = await db.addUser(first, last, email, hash);
    // req.session.userId = user.rows[0].id;
    //res.json({success:true});
    // } catch (err) {
    //     console.log("err in post registration:", err.message);
    // }

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

app.listen(8080, function() {
    console.log("I'm listening.");
});

//node bundle-server.js
