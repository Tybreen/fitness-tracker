const client = require(`./client.js`);

const getRoutines = async () => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM routines;
    `);
    return rows;
  } catch (error) {
    console.log(`MY ERROR:\n`, error);
  }
};

const getRoutine = async (id) => {
  try {
    const {
      rows: [routine]
    } = await client.query(`
      SELECT * FROM routines WHERE id = ${id};
    `);
    return routine;
  } catch (error) {
    console.log(`MY ERROR:\n`, error);
  }
};

const createRoutine = async (is_public, name, goal) => {
  try {
    const {
      rows: [createdRoutine]
    } = await client.query(`
      INSERT INTO routines (is_public, name, goal)
      VALUES ('${is_public}', '${name}', '${goal}')
      RETURNING *;
    `);
    return createdRoutine;
  } catch (error) {
    console.log(`MY ERROR:\n`, error);
  }
};

const deleteRoutine = async (id) => {
  try {
    const {
      rows: [deletedRoutine]
    } = await client.query(`
      DELETE FROM routines
      WHERE id = '${id}'
      RETURNING *;
    `);
    if (deletedRoutine) return deletedRoutine;
    else return `Failed`;
  } catch (error) {
    console.log(`MY ERROR:\n`, error);
  }
};

module.exports = {
  getRoutines,
  getRoutine,
  createRoutine,
  deleteRoutine
};
