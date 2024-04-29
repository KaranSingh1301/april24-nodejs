const accessSchema = require("../schemas/accessSchema");

const rateLimiting = async (req, res, next) => {
  console.log("rate limitng");
  const sid = req.session.id;
  try {
    const accessDb = await accessSchema.findOne({ sessionId: sid });

    if (!accessDb) {
      const accessObj = new accessSchema({
        sessionId: sid,
        time: Date.now(),
      });

      await accessObj.save();
    }

    console.log((Date.now() - accessDb.time.getTime()) / (1000 * 60));

    const diff = (Date.now() - accessDb.time.getTime()) / (1000 * 60);

    if (diff < 8) {
      return res.send({
        status: 429,
        message: "Too many request, please wait for some time",
      });
    }

    await accessSchema.findOneAndUpdate(
      { sessionId: sid },
      { time: Date.now() }
    );

    next();
  } catch (error) {
    return res.send({
      status: 500,
      message: "Database error",
      erro: error,
    });
  }
};

module.exports = rateLimiting;
