const delay = (req, res, next) => {
    const delayTime = parseInt(process.env.BSE_DELAY) || 2000;

    setTimeout(() => {
        next();
    }, delayTime);
};

module.exports = delay;