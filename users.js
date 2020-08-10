var express = require('express');
var app = express.Router();
let student = [
    {
        "id": 1,
        "name": "Shivu"
    }
]

app.get('/', (req, res) => {
    res.json({ data: student, error: null })
});
app.post('/', (req, res) => {
    let id = student.length + 1;
    let name = req.body.name;
    if (!name)
        return res.json({ error: "Wrong Input" });
    else {
        student.push({ id, name });
        return res.json({ success: true })
    }
})
module.exports = app;
