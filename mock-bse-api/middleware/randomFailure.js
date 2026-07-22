
const randomFailure = (req, res, next) => {

    const failureRate = parseFloat(process.env.BSE_FAILURE_RATE) || 0.2;

    if (Math.random() < failureRate) {

        return res.status(500).json({
            success: false,
            message: "BSE API temporarily unavailable. Retry later."
        });

    }

    next();
};

module.exports = randomFailure;