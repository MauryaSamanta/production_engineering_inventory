import Asset from "../models/Asset.js";

const fieldMap = {
  serialNumber: "Serial Number",
  name: "Name",
  category: "Category",
  lab: "Lab",
  specs: "Specifications",
  manufacturer: "Manufacturer",
  yearOfManufacture: "Year of Manufacture",
  situation: "Condition",
  image: "Image",
  type: "Type"
};

function mapFields(asset) {

  const mapped = {
    _id: asset._id   // keep Mongo ID for frontend actions
  };

  for (const key in fieldMap) {
    mapped[fieldMap[key]] = asset[key];
  }

  return mapped;
}

export const getAssetsByLab = async (req, res) => {
  try {

    const { lab } = req.params;
    const { category } = req.query;

    console.log("---- DEBUG START ----");

    console.log("Lab param received:", lab);
    console.log("Lab length:", lab.length);

    const allLabs = await Asset.distinct("lab");
    console.log("All lab values in DB:", allLabs);

    const exactMatch = await Asset.find({ lab });
    console.log("Exact match count:", exactMatch.length);

    const regexMatch = await Asset.find({
      lab: { $regex: lab, $options: "i" }
    });
    console.log("Regex match count:", regexMatch.length);

    const trimmedMatch = await Asset.find({
      lab: lab.trim()
    });
    console.log("Trimmed match count:", trimmedMatch.length);

    console.log("---- DEBUG END ----");

    const query = { lab: lab.trim() };

    if (category) query.category = category;

    const assets = await Asset.find(query).sort({ serialNumber: 1 });

    const consumables = assets
      .filter(a => a.type === "consumable")
      .map(mapFields);

    const nonConsumables = assets
      .filter(a => a.type === "non_consumable")
      .map(mapFields);

    res.json({
      lab,
      total: assets.length,
      consumables,
      nonConsumables
    });

  } catch (err) {

    console.error("Controller error:", err);

    res.status(500).json({
      message: "Error fetching assets"
    });

  }
};

export const searchAssets = async (req, res) => {

  try {

    const {
      serialNumber,
      name,
      category,
      manufacturer,
      situation,
      yearOfManufacture
    } = req.query;

    const query = {};

    /* SERIAL NUMBER SEARCH */

    if (serialNumber && serialNumber.trim() !== "") {
      query.serialNumber = {
        $regex: serialNumber,
        $options: "i"
      };
    }

    /* NAME SEARCH */

    if (name && name.trim() !== "") {
      query.name = {
        $regex: name,
        $options: "i"
      };
    }

    /* CATEGORY */

    if (category) {
      query.category = category;
    }

    /* MANUFACTURER */

    if (manufacturer && manufacturer.trim() !== "") {
      query.manufacturer = {
        $regex: manufacturer,
        $options: "i"
      };
    }

    /* CONDITION */

    if (situation) {
      query.situation = situation;
    }

    /* YEAR */

    if (yearOfManufacture) {
      query.yearOfManufacture = Number(yearOfManufacture);
    }

    const assets = await Asset
      .find(query)
      .sort({ serialNumber: 1 });

    /* Convert to frontend friendly fields */

    const formatted = assets.map(mapFields);

    res.json({
      total: formatted.length,
      assets: formatted
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Error searching assets"
    });

  }

};