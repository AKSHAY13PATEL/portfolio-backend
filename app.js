import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import cors from "cors";

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

app.use(cors());
app.use(express.json());

// Handle form submission
app.post("/submit", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const discordPayload = {
      embeds: [
        {
          title: "📬 New Portfolio Form Submission",
          color: 5814783,
          fields: [
            { name: "👤 Name", value: name, inline: true },
            { name: "📧 Email", value: email, inline: true },
            { name: "📝 Message", value: message },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    };

    await axios.post(DISCORD_WEBHOOK_URL, discordPayload);

    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error sending to Discord:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on ${PORT}`);
});
