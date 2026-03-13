import ChangeRequest from "../models/ChangeRequest.js";
import Asset from "../models/Asset.js";


const fieldMap = {
  _id:"_id",
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

/* reverse mapping */

const reverseFieldMap = Object.fromEntries(
  Object.entries(fieldMap).map(([k, v]) => [v, k])
);

function mapAssetToHuman(asset) {

  const mapped = {};

  for (const mongoKey in fieldMap) {
    const humanKey = fieldMap[mongoKey];
    mapped[humanKey] = asset[mongoKey];
  }

  return mapped;

}

/* ---------------- CREATE CHANGE REQUEST ---------------- */
/* SubAdmin proposes an update */

export const createChangeRequest = async (req, res) => {

  try {

    const { assetId, changeType, newData } = req.body;

    const request = await ChangeRequest.create({

      assetId,

      changeType,        // example: "update_asset"

      newData,           // updated fields

      requestedBy: req.user.id

    });

    res.status(201).json({
      message: "Change request created",
      request
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Error creating change request"
    });

  }

};



/* ---------------- GET ALL PENDING REQUESTS ---------------- */
/* Admin dashboard */

export const getPendingRequests = async (req, res) => {

  try {

    /* ---------- ROLE BASED QUERY ---------- */

    const query = { status: "pending" };

    if (req.user.role === "subadmin") {
      query.requestedBy = req.user.id;
    }

    /* ---------- FETCH REQUESTS ---------- */

    const requests = await ChangeRequest
      .find(query)
      .populate("requestedBy", "name email")
      .populate("assetId");

    const formatted = requests.map((req) => {

      const asset = req.assetId;
      const newData = req.newData;

      const changes = [];

      for (const humanKey in newData) {

        const mongoKey = reverseFieldMap[humanKey];

        const oldVal = asset[mongoKey];
        const newVal = newData[humanKey];

        if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {

          changes.push({
            field: humanKey,
            previous: oldVal,
            updated: newVal
          });

        }

      }

      return {
        _id: req._id,
        assetId: asset._id,
        assetName: asset.name,
        serialNumber: asset.serialNumber,
        requestedBy: req.requestedBy,
        requestedAt: req.createdAt,
        assetData: mapAssetToHuman(asset),
        changes
      };

    });

    res.json({
      total: formatted.length,
      requests: formatted
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Error fetching pending requests"
    });

  }

};



/* ---------------- APPROVE REQUEST ---------------- */

export const approveChange = async (req, res) => {

  try {

    const { id } = req.params;

    const request = await ChangeRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        message: "Request already processed"
      });
    }

    /* Convert human-readable keys to mongo keys */

    const convertedData = {};

    for (const humanKey in request.newData) {

      const mongoKey = reverseFieldMap[humanKey];

      if (mongoKey) {
        convertedData[mongoKey] = request.newData[humanKey];
      }

    }

    /* Apply update */

    await Asset.findByIdAndUpdate(
      request.assetId,
      convertedData
    );

    request.status = "approved";
    request.approvedBy = req.user.id;
    request.approvedAt = new Date();

    await request.save();

    res.json({
      message: "Change approved"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Error approving change"
    });

  }

};


/* ---------------- REJECT REQUEST ---------------- */

export const rejectChange = async (req, res) => {

  try {

    const { id } = req.params;

    const request = await ChangeRequest.findById(id);

    if (!request) {
      return res.status(404).json({
        message: "Request not found"
      });
    }

    if (request.status !== "pending") {
      return res.status(400).json({
        message: "Request already processed"
      });
    }

    request.status = "rejected";
    request.approvedBy = req.user.id;
    request.approvedAt = new Date();

    await request.save();

    res.json({
      message: "Change rejected"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Error rejecting change"
    });

  }

};