const express = require("express");
const router = express.Router();
const axios = require("axios");
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const chatEngineResponse = await axios.get(
      `https://api.chatengine.io/users/me `,
      {
        headers: {
          "Project-ID": process.env.PROJECT_ID,
          "User-Name": username,
          "User-Secret": password,
        },
      }
    );
    res.status(201).json({ response: chatEngineResponse.data });
  } catch (err) {
    console.log(err.messge);
    res.status(500).json({ error: err.message });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const chatEngineResponse = await axios.post(
      `https://api.chatengine.io/users/`,
      {
        username: username,
        secret: password,
      },
      { headers: { "Private-key": process.env.PRIVATE_KEY } }
    );
    res.status(201).json({ response: chatEngineResponse.data });
  } catch (err) {
    console.log(err.messge);
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
