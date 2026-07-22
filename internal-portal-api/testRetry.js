const axios = require("axios");
const retry = require("./utils/retry");

async function test() {
  try {
    const response = await retry(() =>
      axios.get("http://localhost:3000/api/clients")
    );

    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

test();