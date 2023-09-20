import "dotenv/config.js";
import express from "express";
import {chat} from "./src/gpt.js";

const app = express();
app.use(express.json());
app.use(express.static("public"));

const chats = [];

app.get("/chat", async (req, res) => {
   let {content, id} = req.query;
   
   if (!content){
       res.status(400).send("O parâmentro content não foi passado");
       return;
   }

   if(!id){
       const lenght = chats.push([]);
       id = lenght -1;
   }

    chats[id].push({content: content, role: "user"});


   const result = await chat(chats);
   const assistantMessage = result.choices[0].message;

   chats[id].push(assistantMessage);

   res.send ({
       ...assistantMessage,
       id,
    });
});

app.use("/",express.static("public"));

app.listen(3000, () => {
    console.log("Server running on port 3000");

});