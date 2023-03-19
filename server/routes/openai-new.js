import dotenv from "dotenv";
import express from "express";
import { openai } from "../index.js";
import axios from "axios";

dotenv.config();
const router = express.Router();

router.post("/text", async (req, res) => {
    try {
        const {text, activeChatId} = req.body;

        console.log("text", text);

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {role: "system", content: "You are talking to a bot. Say 'stop' to end the conversation."},
                {role: "user", content: text},
            ]
        });

        await axios.post(
       `https://api.chatengine.io/chats/${activeChatId}/messages/`,
       { text: response.data.choices[0].message.content },
       {
         headers: {
           "Project-ID": process.env.PROJECT_ID,
           "User-Name": process.env.BOT_USER_NAME,
           "User-Secret": process.env.BOT_USER_SECRET,
         },
       }
     );

     res.status(200).json({ text: response.data.choices[0].message.content });
    } catch (error) {
        console.error("error", error);
        res.status(500).json({error: error.message});
    }
});
export default router;
