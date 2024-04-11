const client = require(`./client.js`);

const createRoutines_Activity = async (routine_id, activity_id, count) => {
  try {
    const {
      rows: [createdCombo]
    } = await client.query(`
      INSERT INTO routines_activities (routine_id, activity_id, count)
      VALUES ('${routine_id}', '${activity_id}', '${count}')
      RETURNING *;
    `);
    return createdCombo;
  } catch (error) {
    console.log(`MY ERROR:\n`, error);
  }
};

module.exports = { createRoutines_Activity };
