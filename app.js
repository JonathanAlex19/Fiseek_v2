const express = require('express');
const morgan = require('morgan');

// Importing Routes
const teacherRouter = require('./routes/teacherRoutes');
const roomRouter = require('./routes/roomRoutes');
const subjectRouter = require('./routes/subjectRoutes');
const claseRouter = require('./routes/claseRoutes');
const periodRouter = require('./routes/periodRoutes');
const viewRouter = require('./routes/viewRoutes');

// const periodModel = require('./models/periodModel');

const app = express();
const expressLayouts = require('express-ejs-layouts');

// 1) Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));

// const newHour = new periodModel({
//   id: 33,
//   hour: 'N5-N6'
// });

// newHour.save().then(doc=> {console.log(doc)}).catch(err => { console.log(err)});


// 3) Routes
app.use('/api/v1/teachers', teacherRouter);
app.use('/api/v1/classrooms', roomRouter);
app.use('/api/v1/subjects', subjectRouter);
app.use('/api/v1/clases', claseRouter);
app.use('/api/v1/periods', periodRouter);

app.use('/', viewRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`
  });
});

module.exports = app;