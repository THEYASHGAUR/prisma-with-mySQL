const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Worffvbld!");
});

// Get all users
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Create a user
app.post("/users", async (req, res) => {
  const { firstname, lastname, age } = req.body;
  const newUser = await prisma.user.create({
    data: { firstname, lastname, age },
  });
  res.json(newUser);
});

// Get a user by ID
app.get("/users/:id", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(req.params.id) },
  });
  res.json(user);
});

// Update a user
app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  const newAge = req.body.age;

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: { age:newAge },
  });
  res.json(updatedUser);
});

// Delete a user
app.delete("/users/:id", async (req, res) => {
  const user = await prisma.user.delete({
    where: { id: parseInt(req.params.id) },
  });
  res.json(user);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
