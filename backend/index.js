
require('dotenv').config()
var express = require("express");
const app = express();
var cors = require("cors");
app.listen(8080)
app.get('/', (req, res) => {
  res.send('Hello phu')
})
console.log(`RUNING  port ${process.env.HOST} ${process.env.PORT}`)

























app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
// Body parse
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//bcryptJs
var bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var h = "";
var mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://congphu:phu9844136@cluster0-ktfk5.gcp.mongodb.net/angular-jwt-token?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.log("Connect Mongo error ! " + err);
    } else {
      console.log("Connect Mongo sucessfully ! ");
    }
  }
);
const User = require("./model/user.model");
const Product = require("./model/product.model");
const Order = require("./model/order.model");
//JWT

var jwt = require("jsonwebtoken");
var serect = "abcdef";

app.post("/createUser", function (req, res) {
  var user = new User(req.body);
  user.save(function (err) {
    if (err) {
      res.json({ kq: 0, ErrMesg: err });
    } else res.json(user);
  });
});

app.post('/getUser', function (req, res) {
  User.find(req.body, function (err, data) {
    if (err) {
      return res.json({ kq: 0, ErrMesg: err });
    } else return res.json(data)
  })
})

app.post('/updateHistory', function (req, res) {
  User.find(req.body, function (err, data) {
    if (err) {
      return res.json({ kq: 0, ErrMesg: err });
    } else return res.json(data)
  })
})

app.post("/login", function (req, res) {
  const user = req.body;
  const query = User.where({
    username: user.username,
    password: user.password,
  });
  query.findOne(function (err, data) {
    if (err) return res.json({});
    if (data) {
      var token = jwt.sign(user, serect, { expiresIn: '24h' }); // Ton tai trong 1 h. Sau 1h server se xoa token
      res.cookie("token", token, { httpOnly: true });
      return res.json(token);
    }
  });
});

const authenticateJWT = (req, res, next) => {
  console.log(req);
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, serect, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
// Check token

app.get("/hello", authenticateJWT, function (req, res) {
  return res.json({ status: "Thành công" });
});
// Ma hoa password.
app.get("/password/:pw", function (req, res) {
  var pw = req.params.pw;

  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(pw, salt, function (err, hash) {
      if (err) {
        res.send("Co loi: " + err);
      } else {
        h = hash;
        res.send(hash);
      }
    });
  });
});

// Dang nhap va kiem tra password da ma hoa.
app.get("/login/:pw", function (req, res) {
  var pw = req.params.pw;
  bcrypt.compare(pw, h, function (err, res2) {
    if (err) {
      res.send("Co loi: " + err);
    } else {
      if (res2 === true) {
        res.send("OKE!");
      } else {
        res.send("WRONG!");
      }
    }
  });
});


// Product


app.get('/product', function (req, res) {
  Product.find((req.query), function (err, data) {
    if (err) {
      return res.json({ kq: 0, ErrMesg: err });
    } else return res.json(data)
  })

})

app.get('/product/:id', function (req, res) {
  Product.findById(req.params.id, function (err, data) {
    if (err) {
      return res.json({ kq: 0, ErrMesg: err });
    } else return res.json(data)
  })

})


app.post("/product", function (req, res) {
  var product = new Product(req.body.order)

  product.save(function (err) {
    if (err) {
      res.json({ kq: 0, ErrMesg: err });
    } else res.json(req.body);
  });
});

app.put("/product/:id", function (req, res) {
  const id = req.params.id
  Product.findByIdAndUpdate(id, req.body, function (err, data) {
    if (err) {
      return res.json({ kq: 0, ErrMesg: err });
    } else return res.json(data)
  })
});

app.delete("/product/:id", function (req, res) {
  const id = req.params.id
  Product.findByIdAndDelete(id, function (err, data) {
    console.log({ data })
    if (err) {
      return res.json({ kq: 0, ErrMesg: err });
    } else return res.json(data)
  })
});


// Order
app.get('/order', function (req, res) {

  Order.find(function (err, data) {
    if (err) {
      return res.json({ kq: 0, ErrMesg: err });
    } else return res.json(data)
  })

})

app.get('/order/:id', function (req, res) {
  Order.findById(req.params.id, function (err, data) {
    if (err) {
      return res.json({ kq: 0, ErrMesg: err });
    } else return res.json(data)
  })

})


app.post("/order", function (req, res) {
  var order = new Order(req.body.order)
  order.save(function (err, value) {
    if (!err) {
      User.findOne({ username: req.body.username }, (err, data) => {
        console.log({ value, data })
        data.history.push(value._id);
        data.save()
      })
      return res.json(req.body);
    } else res.json({ kq: 0, ErrMesg: err });
  });
});

app.put("/order/:id", function (req, res) {
  const id = req.params.id
  Order.findByIdAndUpdate(id, req.body, function (err, data) {
    if (err) {
      return res.json({ kq: 0, ErrMesg: err });
    } else return res.json(data)
  })
});

app.delete("/order/:id", function (req, res) {
  const id = req.params.id
  Order.findByIdAndDelete(id, function (err, data) {
    if (err) {
      return res.json({ kq: 0, ErrMesg: err });
    } else return res.json(data)
  })
});
// ----------------------Tong hop: --------------------------------

//multer
var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    console.log(file);
    if (
      file.mimetype == "image/bmp" ||
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/gif"
    ) {
      cb(null, true);

      var pw = req.body.Password;

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(pw, salt, function (err, hash) {
          if (err) {
            res.send("Co loi: " + err);
          } else {
            h = hash;
          }
        });
      });
    } else {
      return cb(new Error("Only image are allowed!"));
    }
  },
}).single("avatar");

app.get("/dangky", function (req, res) {
  res.render("home");
});

app.post("/xuly", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log("A Multer error occurred when uploading.");
      res.json({ kq: 0, err: err });
    } else if (err) {
      console.log("An unknown error occurred when uploading." + err);
    } else {
      console.log("Upload is okay");
      console.log(req.file); // Thông tin file đã upload

      var name = req.body.Name;
      var un = req.body.Username;
      // Xuat ra json
      res.json({
        name: name,
        username: un,
        password: h,
        file: req.file.filename,
      });

      var token = jwt.sign(
        {
          name: name,
          username: un,
          password: h,
          file: req.file.filename,
        },
        serect,
        { expiresIn: 60 * 60 }
      ); // Ton tai trong 1 h. Sau 1h server se xoa token
      console.log(token);
    }
  });
});

app.use(express.static(__dirname + '/public/upload'));
var storage = multer.diskStorage({
  // destination
  destination: function (req, file, cb) {
    cb(null, 'public/upload/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });
app.post("/upload", upload.array("uploads[]", 12), function (req, res) {
  console.log('files', req.files);
  res.send(req.files);
});