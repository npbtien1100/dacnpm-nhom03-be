import express from "express";
import EmailHelper from "../../helper/email/EmailHelper";
const router = express.Router();
const mailer = new EmailHelper();

router.post("/test", async (req, res) => {
  try {
    const content = {
      link: "http://localhost:3000/seller/register",
    };
    const mailOptions = {
      from: req.body.from,
      to: req.body.to,
    };
    const result = await mailer.sendRegisterSeller(
      mailOptions.from,
      mailOptions.to,
      content
    );
    res.status(200).json({
      message: "Send mail success",
      result: result,
    });
  } catch (error) {
    console.log({ error });
    res.status(500).send(error);
  }
});

router.post("/upload", (req, res) => {});

export default router;
