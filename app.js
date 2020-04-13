const express = require('express');

const fs = require('fs');
const teachers = require('./teachers.json');
let students = require('./students.json');

const subjects = require('./subjects.json');

const app = express();

const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.get('/', (req, res) => {
	res.send('hal0');
});

// Students
app.get('/students', (req, res) => {
	res.render('students.ejs', { students });
});

app.get('/students/add', (req, res) => {
	res.render('studentsAdd.ejs');
});

app.post('/students/add', (req, res) => {
	const idStudent = Number(students[students.length - 1].id) + 1;

	const first_name = req.body.firstname;

	const last_name = req.body.lastname;
	const emailStudent = req.body.email;
	let genderStudent = req.body.gender;
	if (genderStudent == 1) {
		genderStudent = 'male';
	} else {
		genderStudent = 'female';
	}
	const dob = req.body.birth_date;

	students.push({
		id: String(idStudent),
		first_name: first_name,
		last_name: last_name,
		email: emailStudent,
		gender: genderStudent,
		birth_date: dob
	});
	// res.send(students)
	fs.writeFileSync('./students.json', JSON.stringify(students, null, 2));
	res.redirect('/students');
});

app.get('/students/:id/delete', (req, res) => {
	let paramId = req.params.id;
	for (let i = 0; i < students.length; i++) {
		if (students[i].id == paramId) {
			students.splice(i, 1);
		}
	}
	fs.writeFileSync('./students.json', JSON.stringify(students, null, 2));
	res.redirect('/students');
});

app.get('/students/:id/edit', (req, res) => {
	let kotak = [];
	let simpen = req.params.id;
	for (let i = 0; i < students.length; i++) {
		if (students[i].id == req.params.id) {
			kotak.push({
				first_name: students[i].first_name,
				last_name: students[i].last_name,
				email: students[i].email
			});
		}
	}
	res.render('studentsEdit.ejs', { kotak: kotak, simpen: simpen });
});

app.post('/students/:id/edit', (req, res) => {
	// res.send(req.params.id);
	for (let i = 0; i < students.length; i++) {
		if (students[i].id == req.params.id) {
			students[i].first_name = req.body.firstname;
			students[i].last_name = req.body.lastname;
			students[i].email = req.body.email;
		}
	}

	fs.writeFileSync('./students.json', JSON.stringify(students, null, 2));
	res.redirect('/students');
});

app.get('/students/:email', (req, res) => {
	for (var i = 0; i < students.length; i++) {
		if (req.params.email == students[i].email) {
			res.send(students[i]);
		}
	}
});

//Subjects

app.get('/subjects', (req, res) => {
	res.render('subjects.ejs', { subjects });
});

app.get('/subjects/:id', (req, res) => {
	for (var i = 0; i < subjects.length; i++) {
		if (req.params.id == subjects[i].id) {
			res.send(subjects[i]);
		}
	}
});

//teachers
app.get('/teachers', (req, res) => {
	res.render('teachers.ejs', { teachers });
});

app.get('/teachers/:id', (req, res) => {
	for (var i = 0; i < teachers.length; i++) {
		if (req.params.id == teachers[i].id) {
			res.send(teachers[i]);
		}
	}
});

app.listen(port, () => {
	console.log('heyyyy');
});
