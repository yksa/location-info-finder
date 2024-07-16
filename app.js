const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/location", async (req, res) => {
  const { lat, lon } = req.query;
  console.log({ lat, lon });

  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: "Latitude and Longitude are required" });
  }

  try {
    const response = await axios.get(
      "https://nominatim.openstreetmap.org/reverse",
      {
        params: {
          format: "json",
          lat,
          lon,
          addressdetails: 1,
        },
      }
    );

    console.log(response.data);

    const address = response.data.address;

    res.json(address);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch location info" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
