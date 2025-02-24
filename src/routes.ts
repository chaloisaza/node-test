import { Request, Router, Response } from "express";
import { check, validationResult } from "express-validator";

const router = Router();

router.get("/", (_, res) => {
  res.send("silence is golden 😎...");
});

router.post(
  "/form",
  [
    check("name").isString().notEmpty(),
    check("surname").isString().notEmpty(),
    check("email").isEmail(),
    check("phone").isNumeric().isLength({ min: 9, max: 11 }),
  ],
  async (req: Request, res: Response): Promise<void> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    res.json({ message: "Data received", data: req.body });
  },
);

export default router;
