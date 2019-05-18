// Manage Roles (id, name)
const express = require('express');
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.db3',
  },
  useNullAsDefault: true, // needed for sqlite
};
const db = knex(knexConfig);

const server = express();

server.use(express.json());


// create cohort
server.post('/api/cohorts', async (req, res) => {
  try {
    const [id] = await db('cohorts').insert(req.body);

    const cohort = await db('cohorts')
      .where({ id })
      .first();

    res.status(201).json(role);
  } catch (error) {
    const message = 'We ran into an error';
    res.status(500).json({ message, error });
  }
});

// list all cohorts
server.get('/api/cohorts', async (req, res) => {
  // get the roles from the database
  try {
    const cohorts = await db('cohorts'); // all the records from the table
    res.status(200).json(cohorts);
  } catch (error) {
    res.status(500).json(error);
  }
});

// list a cohort by id
server.get('/api/cohorts/:id', async (req, res) => {
  // get the roles from the database
  try {
    const cohort = await db('cohorts')
      .where({ id: req.params.id })
      .first();
    res.status(200).json(cohort);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update cohort
server.put('/api/cohorts/:id', async (req, res) => {
  try {
    const count = await db('cohorts')
      .where({ id: req.params.id })
      .update(req.body);

    if (count > 0) {
      const role = await db('cohorts')
        .where({ id: req.params.id })
        .first();

      res.status(200).json(role);
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// remove cohort
server.delete('/api/cohorts/:id', async (req, res) => {
  try {
    const count = await db('cohorts')
      .where({ id: req.params.id })
      .del();

    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Records not found' });
    }
  } catch (error) {}
});

const port = process.env.PORT || 5000;
server.listen(port, () =>
  console.log(`\n** API running on http://localhost:${port} **\n`)
);
