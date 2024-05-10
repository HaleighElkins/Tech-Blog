// const path = require('path');
// const express = require('express');
// const session = require('express-session');
// const exphbs = require('express-handlebars');
// const routes = require('./controllers');
// const blogRoutes = require('./controllers/api/blogRoutes')
// const helpers = require('./utils/helpers');
// const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const PORT = process.env.PORT || 3001;

// const app = express();

// const hbs = exphbs.create({ helpers });

// const sessionConfig = {
//   secret: 'Super secret secret',
//   cookie: {
//     maxAge: 999999,
//     httpOnly: true,
//     secure: false,
//     sameSite: 'strict',
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// app.use(session(sessionConfig));
// app.use('/', blogRoutes);
// // app.use('/api/blogs', blogRoutes);


// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use(routes);

// sequelize.sync({ force: false })
//   .then(() => {
//     app.listen(PORT, () => console.log('Now listening'));
//   })
//   .catch(err => {
//     console.error('Error starting server:', err);
//   });



// const path = require('path');
// const express = require('express');
// const session = require('express-session');
// const exphbs = require('express-handlebars');
// const routes = require('./controllers');
// const blogRoutes = require('./controllers/api/blogRoutes')
// const helpers = require('./utils/helpers');
// const sequelize = require('./config/connection');
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// const PORT = process.env.PORT || 3001;

// const app = express();

// const hbs = exphbs.create({ helpers });

// const sessionConfig = {
//   secret: 'Super secret secret',
//   cookie: {
//     maxAge: 999999,
//     httpOnly: true,
//     secure: false,
//     sameSite: 'strict',
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// app.use(session(sessionConfig));

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/api/blogs', blogRoutes); // Mount blogRoutes at /api/blogs

// app.use(routes);

// sequelize.sync({ force: false })
//   .then(() => {
//     app.listen(PORT, () => console.log('Now listening'));
//   })
//   .catch(err => {
//     console.error('Error starting server:', err);
//   });


const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const blogRoutes = require('./controllers/api/blogRoutes')
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const PORT = process.env.PORT || 3001;

const app = express();

const hbs = exphbs.create({ helpers });

const sessionConfig = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 999999,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sessionConfig));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/blogs', blogRoutes); 

app.use(routes);

sequelize.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  })
  .catch(err => {
    console.error('Error starting server:', err);
  });
