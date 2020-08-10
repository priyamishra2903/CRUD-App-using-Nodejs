let express = require('express');
let app = express.Router();
const courses = [
    {
        "id": 1,
        "name": "Computer",
        "avaiableslots": 10
    }
];
let students = [
    {
        "id": 1,
        "name": "Shivu"
    }
];
app.get('/', (req, res) => {
    try {
        res.json(courses)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }
})

app.post('/', (req, res) => {
    try {
        let name = req.body.name;

        let availableslots = req.body.availableslots;
        let id = courses.length + 1;
        if (!name || !availableslots) {
            return res.status(400).json({ error: "some details are missing" })
        } else {
            courses.push({ id, name, availableslots });
            res.json({ success: true })

        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

app.post('/:id/enroll', (req, res) => {
    try {
        let id = req.params.id;

        let course = courses.data.find((course) => {
            return course.id === parseInt(courseId);
        });
        const student = students.data.find((student) => {
            return student.id === parseInt(studentId);
        });
        if (!course) {
            return res.json({ error: "course not present" })
        }
        if (!student) {
            return res.json({ error: "student not present" })
        }

        if (course.availableslots == 0) {
            return res.json({ error: "no empty slots" })
        }
        else {
            courses.data[courseId - 1].enrolledStudents.push({
                id: student.id,
                name: student.name,
            });

            return res.json({ success: true })
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})
module.exports = app;