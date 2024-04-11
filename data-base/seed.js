const client = require(`./client.js`);
const { createRoutine } = require("./routines.js");
const { createActivity } = require("./activities.js");
const { createRoutines_Activities } = require("./routines_activities.js");

const createTables = async () => {
  try {
    await client.query(`
      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        is_public BOOLEAN NOT NULL,
        name VARCHAR(30) NOT NULL,
        goal VARCHAR(30)
      );
      
      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        description TEXT
      );

      CREATE TABLE routines_activities (
        id SERIAL PRIMARY KEY,
        activity_id INT NOT NULL,
        routine_id INT NOT NULL,
        count INT NOT NULL
      );
    `);
  } catch (error) {
    console.log(`MY ERROR:\n`, error);
  }
};

const dropTables = async () => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS routines_activities;
      DROP TABLE IF EXISTS routines;
      DROP TABLE IF EXISTS activities;
    `);
  } catch (error) {
    console.log(`MY ERROR:\n`, error);
  }
};

const syncAndSeed = async () => {
  await client.connect();
  console.log(`CLIENT CONNECTED\n---------------`);

  await dropTables();
  console.log(`DROPPED TABLES`);

  await createTables();
  console.log(`CREATED TABLES\n`);

  const Tylers = await createRoutine(false, `Tylers routine`, `ript`);
  const Sammys = await createRoutine(true, `Sammys super routine`, `Muscles`);
  const Maddies = await createRoutine(false, `Maddies flower boxes routine`, `Flower box arms`);
  const Cocos = await createRoutine(false, `Cocos routine`, `nothing`);
  console.log(`CREATED Routines\n`);

  const boxes = await createActivity(`Hauling boxes`, `What it says...`);
  const coding = await createActivity(`Coding`, `Coding... A LOT.`);
  const resting = await createActivity(`Resting`, `Resting...`);
  const walking = await createActivity(`Walking`, `Walking a mile.`);
  console.log(`CREATED Activities\n`);

  await createRoutines_Activities(Maddies.id, boxes.id, 100);
  await createRoutines_Activities(Maddies.id, resting.id, 1);
  await createRoutines_Activities(Maddies.id, walking.id, 2);
  await createRoutines_Activities(Sammys.id, walking.id, 1);
  await createRoutines_Activities(Tylers.id, coding.id, 6);
  await createRoutines_Activities(Tylers.id, walking.id, 1);
  await createRoutines_Activities(Cocos.id, resting.id, 5);
  await createRoutines_Activities(Cocos.id, walking.id, 2);
  console.log(`CREATED Routines_Activities`);

  await client.end();
  console.log(`---------------\nCLIENT DIS-CONNECTED\n`);
};

syncAndSeed();
