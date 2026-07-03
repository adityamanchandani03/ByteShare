import { Router } from "express";
import crypto from "crypto";
import { requireAuth } from "../middlewares/auth";
const router = Router();
router.post("/upload/sign", requireAuth, async (_req, res) => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    res.status(500).json({ error: "Cloudinary not configured" });
    return;
  }
  const timestamp = Math.round(Date.now() / 1e3);
  const uploadPreset = "byteshare_uploads";
  const toSign = `timestamp=${timestamp}&upload_preset=${uploadPreset}${apiSecret}`;
  const signature = crypto.createHash("sha256").update(toSign).digest("hex");
  res.json({
    signature,
    timestamp,
    cloudName,
    apiKey,
    uploadPreset
  });
});
var stdin_default = router;
export {
  stdin_default as default
};
