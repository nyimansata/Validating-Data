const express = require("express");
const Joi = require("joi");

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const router = express.Router();

router.get("/", async (req, res) => {
  const getAllUsers = await prisma.user.findMany();
  res.send(getAllUsers);
});

// post user
router.post("/", async (req, res) => {
  const { error } = ValidateData(req.body);

  if (error) {
    // bad request
    return res.status(400).send(error.details[0].message);
  }

  try {
    const addUser = await prisma.user.create({ data: req.body });
    res.send(addUser);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// validation function
const ValidateData = (data) => {
  // schema
  const schema = Joi.object({
    Name: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    age: Joi.number().min(3).required(),
  });

  // validate
  return (result = schema.validate(data));
};

module.exports = router;
