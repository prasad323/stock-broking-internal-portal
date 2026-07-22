const retry = async (apiCall, retries = 3, delay = 2000) => {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`Attempt ${attempt}`);

      const response = await apiCall();

      return response;
    } catch (error) {
      lastError = error;

      console.log(`Attempt ${attempt} failed`);

      if (attempt < retries) {
        console.log(`Retrying in ${delay / 1000} seconds...`);

        await new Promise((resolve) => setTimeout(resolve, delay));

        delay *= 2;
      }
    }
  }

  throw lastError;
};

module.exports = retry;