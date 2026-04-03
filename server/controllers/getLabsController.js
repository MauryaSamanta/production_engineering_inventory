import Labs from "../models/Labs.js";

export const getLabs = async (req, res) => {
  try {
    const labs = await Labs.find();

    res.status(200).json(labs);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching labs",
      error: error.message
    });
  }
};