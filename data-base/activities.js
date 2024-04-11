const client = require(`./client.js`);

const getActivities = async () => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM activities;
    `);
    return rows;
  } catch (error) {
    console.log(`MY ERROR:\n`, error);
  }
};

const getActivity = async (id) => {
  try {
    const {
      rows: [activity]
    } = await client.query(`
      SELECT * FROM activities WHERE id = ${id};
    `);
    return activity;
  } catch (error) {
    console.log(`MY ERROR:\n`, error);
  }
};

const createActivity = async (name, description) => {
  try {
    const {
      rows: [createdActivity]
    } = await client.query(`
      INSERT INTO activities (name, description)
      VALUES ('${name}', '${description}')
      RETURNING *;
    `);
    return createdActivity;
  } catch (error) {
    console.log(`MY ERROR:\n`, error);
  }
};

const deleteActivity = async (id) => {
  try {
    const {
      rows: [deletedActivity]
    } = await client.query(`
      DELETE FROM activities
      WHERE id = '${id}'
      RETURNING *;
    `);
    if (deletedActivity) return deletedActivity;
    else return `Failed`;
  } catch (error) {
    console.log(`MY ERROR:\n`, error);
  }
};

module.exports = {
  getActivities,
  getActivity,
  createActivity,
  deleteActivity
};
