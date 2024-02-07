const { Token } = require("../models/tokModel");

const getTokensForToday = async (req, res) => {
    try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const tokensForToday = await Token.find({
            "tokens.createdAt": { $gte: todayStart, $lte: todayEnd }
        });

        res.status(200).send({ tokens: tokensForToday });
    } catch (err) {
        return res.status(500).send({ message: "Server Error For Retrieving Tokens " + err });
    }
};

module.exports = { getTokensForToday };
