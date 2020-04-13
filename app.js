const express = require('express');
const port = 3000;
const app = express();

const teacherRoutes = require('./routes/teachers');
const studentRoutes = require('./routes/students');
const subjectRoutes = require('./routes/subjects');

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get(`/`, (req, res) => {
    res.render(`index`);
})

app.use('/student', studentRoutes);
app.use('/teacher', teacherRoutes);
app.use('/subject', subjectRoutes);

app.listen(port, () => console.log(`App running at port ${port}`));
