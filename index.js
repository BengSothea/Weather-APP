import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { API_KEY } from "./apiConfig.js";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/",(req,res)=>{
   res.render("index.ejs");
});

app.post("/submit", async (req,res)=>{
    const city = req.body.locationName;

    try{
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const weatherTemp = result.data;
        res.render("index.ejs",{weathers: weatherTemp, City:city});
    } catch (error){
      res.render("index.ejs",{error: "Country or city not found!" });
    }
});


app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});