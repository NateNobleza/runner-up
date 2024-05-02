/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import {
  ClientError,
  defaultMiddleware,
  errorMiddleware,
} from './lib/index.js';
import { ClientRequest } from 'http';

const connectionString =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.RDS_USERNAME}:${process.env.RDS_PASSWORD}@${process.env.RDS_HOSTNAME}:${process.env.RDS_PORT}/${process.env.RDS_DB_NAME}`;
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
app.use(express.json());

app.get('/api/users', async (req, res, next) => {
  try {
    const sql = `
select * from "users"
order by "userId"
`;
    const result = await db.query(sql);
    const entries = result.rows;
    if (!entries) throw new ClientError(400, 'Entries not found');
    res.json(entries);
  } catch (err) {
    next(err);
  }
});

app.get('/api/users/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!Number.isInteger(+userId))
      throw new ClientError(400, 'userId not a number');
    const sql = `
    select * users
    where "userId" = $1
    `;
    const params = [userId as string];
    const result = await db.query(sql, params);
    const [users] = result.rows;
    if (!users) throw new ClientError(400, `Entry ${userId} not found`);
    res.json(users);
  } catch (err) {
    next(err);
  }
});

app.post('api/users', async (req, res, next) => {
  try {
    const { userName, hashPassword } = req.body;
    if (!userName || !hashPassword)
      throw new ClientError(400, 'entry requires all inputs');
    const sql = `
    insert into "users" ("userName", "hashPassword")
    values ($1, $2)
    returning *;
    `;
    const params = [userName as string, hashPassword as string];
    const result = await db.query(sql, params);
    const [entry] = result.rows;
    if (!entry) throw new ClientError(400, 'Entry not found');
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
});

app.put('/api/users/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!Number.isInteger(+userId))
      throw new ClientError(400, 'userId must be a number');
    const { userName, hashPassword } = req.body;
    if (!userName || !hashPassword)
      throw new ClientError(400, 'userName and hashPassword needed');
    const sql = `
      update "users"
      set "userName" = $1, "hashPassword" = $2
      where "userId" = $3
      returning *;
      `;
    const params = [userName as string, hashPassword as string];
    const result = await db.query(sql, params);
    const [updatedEntry] = result.rows;
    if (!updatedEntry) throw new ClientError(400, 'not updated entry');
    res.status(200).json(updatedEntry);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/users/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!Number.isInteger(+userId))
      throw new ClientError(400, 'userId not a number');
    const sql = `
delete from "users"
where "userId" = $1
returning *;
`;
    const params = [userId as string];
    const result = await db.query(sql, params);
    const [deletedEntry] = result.rows;
    if (!deletedEntry) throw new ClientError(400, 'deleted entry not found');
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

app.get('/api/runs', async (req, res, next) => {
  try {
    const sql = `
    select *
    from "runs"
    order by "runId"
    `;
    const result = await db.query(sql);
    const entries = result.rows;
    if (!entries) throw new ClientError(404, 'Entries not found');
    res.json(entries);
  } catch (err) {
    next(err);
  }
});

app.get('/api/runs/:runId', async (req, res, next) => {
  try {
    const { runId } = req.params;
    if (!Number.isInteger(+runId))
      throw new ClientError(404, 'runId must be a number');
    const sql = `
    select * from
    "runs"
    where "runId" = $1
    `;
    const params = [runId as string];
    const result = await db.query(sql, params);
    const [runs] = result.rows;
    if (!runs) throw new ClientError(404, `Entry ${runId} not found`);
    res.json(runs);
  } catch (err) {
    next(err);
  }
});

app.post('/api/runs', async (req, res, next) => {
  try {
    const userId = '1'
    const { time, distance, date, weather } = req.body;
    if (!time || !distance || !date || !weather )
      throw new ClientError(404, 'Entry requires all inputs');
    const sql = `insert into "runs"
    ("time", "distance", "date", "weather", "userId")
    values ($1, $2, $3, $4, $5)
    returning *`;
    const params = [
      time as string,
      distance as string,
      date as string,
      weather as string,
      userId as string,
    ];
    const result = await db.query(sql, params);
    const [entry] = result.rows;
    console.log(entry);
    if (!entry) throw new ClientError(404, 'entry not found');
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
});

app.put('/api/runs/:runId', async (req, res, next) => {
  try {
    const userId = '1'
    const { runId } = req.params;
    if (!Number.isInteger(+runId))
      throw new ClientError(400, 'runId must be a number');
    const { time, distance, date, weather } = req.body;
    if (!time || !distance || !date || !weather)
      throw new ClientError(400, 'time, distance, date, weather needed');
    const sql = `
    update "runs"
    set "time" = $1, "distance" = $2, "date" = $3, "weather" = $4, "userId" = $5
    where "runId" = $6
    returning *
    `;
    const params = [
      time as string,
      distance as string,
      date as string,
      weather as string,
      userId as string,
      runId as string
    ];
    const result = await db.query(sql, params);
    const [updatedEntry] = result.rows;
    if (!updatedEntry) throw new ClientError(404, 'updated entry not found');
    res.status(200).json(updatedEntry);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/runs/:runId', async (req, res, next) => {
  try {
    const { runId } = req.params;
    if (!Number.isInteger(+runId))
      throw new ClientError(400, 'runId not number');
    const sql = `
    delete from "runs"
    where "runId" = $1
    returning *
    `;
    const params = [runId as string];
    const result = await db.query(sql, params);
    const [deletedEntry] = result.rows;
    if (!deletedEntry) throw new ClientError(404, 'deleted entry not found');
    res.sendStatus(204)
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
