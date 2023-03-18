const axios = require("axios");
// const openai = require("../index");
const { Configuration, OpenAIApi } = require("openai");
const dotenv = require("dotenv");
dotenv.config();
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const getAllText = async (req, res) => {
  try {
    console.log(req.body);
    // const { text, activeChatId } = req.body;
    // console.log(openai);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "you are a helpful assistant" },
        { role: "user", content: text },
      ],
    });
    // console.log("data");
    // console.log("response.data", response.data);
    await axios.post(
      `https://api.chatengine.io/chats/${activeChatId}/messages/`,
      {
        text: response.data.choices[0].message.content,
      },
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": process.env.BOT_USER_NAME,
          "User-Secret": process.env.BOT_USER_SECRET,
        },
      }
    );
    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: err.message });
  }
};

const getCode = async (req, res) => {
  try {
    const { text, activeChatId } = req.body;
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant coder who responds with only code and no explanations.",
        },
        {
          role: "user",
          content: text,
        },
      ],
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
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const assistAi = async (req, res) => {
  try {
    const { text } = req.body;
    const response = openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that serves to only complete user's thoughts or sentences.",
        },
        { role: "user", content: `Finish my thought: ${text}` },
      ],
    });
    res.status(200).json({ text: response.data.choices[0].message.content });
  } catch (err) {}
};
module.exports = { getAllText, getCode, assistAi };
