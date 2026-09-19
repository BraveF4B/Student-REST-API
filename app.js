import express from "express";
import { students } from "./data.js";

const app = express();
app.use(express.json());

app.get("/students", (req, res) => {
    res.status(200).json(students);
});

app.get("/students/:id", (req, res) => {

    const id = +req.params.id;
    const student = students.find(student => student.id === id);
    res.status(200).json(student);
});



app.get("/students", (req, res) => {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 2;

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const data = students.slice(startIndex, endIndex);

    res.status(200).json({
        message: "Students fetched successfully",
        page: page,
        limit: limit,
        data: data
    });
});

app.post("/students", (req, res) => {
    const data = {
         id: students.length + 1,
        ...req.body,
    };
    res.status(201).json(data);
    students.push(data);
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});