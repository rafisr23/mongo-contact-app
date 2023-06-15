const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const { body, validationResult, check } = require('express-validator');
const methodOverride = require('method-override');

require('./utils/db');
const Contact = require('./models/contact');

const app = express();
const port = 3000;

// setup method override
app.use(methodOverride('_method'));

// setup ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// setup flash
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// Home page
app.get('/', (req, res) => {
  const mahasiswa = [
    {
      nama: 'Udin',
      email: 'udin@Mail.com',
    },
    {
      nama: 'David',
      email: 'david@Mail.com',
    },
    {
      nama: 'Oscar',
      email: 'oscar@Mail.com',
    },
  ];
  res.render('index', {
    layout: 'layouts/main-layout',
    nama: 'Rafii',
    title: 'Halaman Home',
    mahasiswa,
  });
});

// About page
app.get('/about', (req, res, next) => {
  res.render('about', {
    layout: 'layouts/main-layout',
    title: 'Halaman About',
  });
});

// Contact page
app.get('/contact', async (req, res) => {
  const contacts = await Contact.find();
  res.render('contact', {
    layout: 'layouts/main-layout',
    title: 'Halaman Contact',
    contacts,
    msg: req.flash('msg'),
  });
});

app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    layout: 'layouts/main-layout',
    title: 'Add Contact',
  });
});

app.post(
  '/contact/store',
  [
    body('name').custom(async (value) => {
      const duplicate = await Contact.findOne({ name: value });
      if (duplicate) {
        throw new Error('Contact name already used!');
      }
      return true;
    }),
    check('email', 'Email is not valid!').isEmail(),
    body('phoneNumber', 'Phone number is not valid!').isMobilePhone('id-ID'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render('add-contact', {
        title: 'Add Contact',
        layout: 'layouts/main-layout',
        errors: errors.array(),
      });
    } else {
      const result = await Contact.insertMany(req.body);
      if (result) {
        req.flash('msg', 'Contact successfuly added!');
        res.redirect('/contact');
        console.log(result);
      }
    }
  }
);

app.delete('/contact', async (req, res) => {
  const result = await Contact.deleteOne({ _id: req.body._id });
  if (result.deletedCount === 1) {
    req.flash('msg', 'Contact successfuly deleted!');
    res.redirect('/contact');
  }
});

app.get('/contact/edit/:name', async (req, res) => {
  const contact = await Contact.findOne({ name: req.params.name });

  res.render('edit-contact', {
    layout: 'layouts/main-layout',
    title: 'Edit Contact',
    contact,
  });
});

app.put(
  '/contact',
  [
    body('name').custom(async (value, { req }) => {
      const duplicate = await Contact.findOne({ name: value });
      if (duplicate) {
        throw new Error('Contact name already used!');
      }
      return true;
    }),
    check('email', 'Email is not valid!').isEmail(),
    body('phoneNumber', 'Phone number is not valid!').isMobilePhone('id-ID'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('edit-contact', {
        title: 'Edit Contact',
        layout: 'layouts/main-layout',
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      const result = await Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
          },
        }
      );
      if (result.modifiedCount === 1) {
        req.flash('msg', 'Contact successfuly changed!');
        res.redirect('/contact');
        console.log(result);
      }
    }
  }
);

app.get('/contact/:name', async (req, res) => {
  const contact = await Contact.findOne({ name: req.params.name });

  res.render('detail', {
    layout: 'layouts/main-layout',
    title: 'Halaman Detail Contact',
    contact,
  });
});

app.listen(port, () => {
  console.log(`Mongo Contact App | listening at http://localhost:${port}`);
});
