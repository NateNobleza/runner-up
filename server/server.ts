/* eslint-disable @typescript-eslint/no-unused-vars -- Remove when used */
import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import {
  ClientError,
  defaultMiddleware,
  errorMiddleware,
} from './lib/index.js';

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

app.get('/api/runs/:runsId', async (req, res, next) => {
  try {
    const { runsId } = req.params;
    if (!Number.isInteger(+runsId))
      throw new ClientError(404, 'runsId must be a number');
    const sql = `
    select *
    "runs"
    where "runsId" = $1
    `;
    const params = [runsId as string];
    const result = await db.query(sql, params);
    const [runs] = result.rows;
    if (!runs) throw new ClientError(404, `Entry ${runsId} not found`);
    res.json(runs);
  } catch (err) {
    next(err);
  }
});

app.post('/api/runs', async (req, res, next)=>{
  try{

  } catch(err){
    next(err)
  }
})

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
