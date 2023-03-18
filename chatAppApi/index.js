const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const openAiRouter = require("./Routes/OpenAi");
// const { Configuration, OpenAIApi } = require("openai");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy());
// console.log(app.get(morgan("dev")));
app.use(morgan("common"));

app.use(bodyParser.json({ extended: true, limit: "30mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "30mb",
  })
);
// OPEN AI

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
app.use("/openai", openAiRouter);
const port = process.env.PORT || 5000;
// console.log(process.env);
// module.exports = new OpenAIApi(configuration);
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
