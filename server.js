const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const shopRoutes = require("./routes/shopRoute");

const app = express();




app.set("views", "templates");
app.set("view engine", "pug");

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, `public`)));



async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://dbnodejsuser:dbnodejspassword@cluster0.arh6c.mongodb.net/myFirstDatabase",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    app.listen(PORT, () => {
      console.log("server has been started");
    });
  } catch (e) {
    console.log(e);
  }
}


app.use(`/auth`, authRoutes);
app.use(`/admin`, adminRoutes);
app.use(shopRoutes);

app.use((req,res)=>{
    res.status(404).render("404page");
});

app.listen(8080);