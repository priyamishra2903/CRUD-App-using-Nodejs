let express = require('express');
let app = express.Router();
const courses = [
    {
        "id": 1,
        "name": "Computer",
        "enrolledstudents": [{
            "id": 1,
            "name": "abc"
        }],
        "availableslots": 9

    }
];
const students = [
    {
        "id": 1,
        "name": "Priya"
    }
];
//get all courses
app.get('/', (req, res) => {
    try {
        res.json(courses)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');

    }
})

// create a new course
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


    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})


//enroll a student if slots are available

app.post('/:id/enroll', (req, res) => {
    try {
        const courseId = req.params.id;
        const studentId = req.body.id;


        const course = courses.find((course) => {
            return course.id === parseInt(courseId);

        });

        const student = students.find((student) => {
            return student.id === parseInt(studentId);
        });
        if (!course) {
            return res.json({ error: "course not present" })
        }
        if (!student) {
            return res.json({ error: "student not present" })
        }

        if (course.availableslots === 0) {
            return res.json({ error: "no empty slots" })
        }
        else {
            course.enrolledstudents.push({
                id: student.id,
                name: student.name,
            });
            course.availableslots = course.availableslots - 1;
            console.log(course)
            return res.json({ success: true })


        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})
// Remove a student from course

app.put('/:id/deregister', (req, res) => {
    try {
        const courseId = req.params.id;
        const student_id = req.body.id;
        const course = courses.find((course) => {
            return course.id === parseInt(courseId);
        });
        if (!course)
            return res.json({ error: "this course is currently not present" });

        const enrolledStudents = course.enrolledstudents;
        const found = enrolledStudents.some((student) => {
            return student.id === parseInt(student_id);
        });
        if (!found)
            return res.json({ error: "student id doesn't exist" });

        let newlist = course.enrolledstudents.filter(student => student.id !== student_id);
        course.enrolledstudents = newlist;
        course.availableslots = course.availableslots + 1;
        console.log(course)
        return res.json({ success: true })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
module.exports = app;
