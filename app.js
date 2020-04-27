const express = require('express');
const morgan = require('morgan');

// Importing Routes
const teacherRouter = require('./routes/teacherRoutes');
const classroomRouter = require('./routes/classroomRoutes');
const subjectRouter = require('./routes/subjectRoutes');
const claseRouter = require('./routes/claseRoutes');

const app = express();

// 1) Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// 3) Routes
app.use('/api/v1/teachers', teacherRouter);
app.use('/api/v1/classrooms', classroomRouter);
app.use('/api/v1/subjects', subjectRouter);
app.use('/api/v1/clases', claseRouter);

module.exports = app;