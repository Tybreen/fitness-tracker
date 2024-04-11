const express = require(`express`);
const app = express();

const client = require(`./data-base/client.js`);
client.connect();

const { getActivities, getActivity, createActivity, deleteActivity } = require("./data-base/activities.js");
const { getRoutines, getRoutine, createRoutine, deleteRoutine } = require("./data-base/routines");
const { createRoutines_Activities } = require("./data-base/routines_activities.js");

app.use(express.json());

// gets:
app.get(`/`, (req, res) => {
  try {
    res.send(`Hi there`);
  } catch (error) {
    console.log(error);
  }
});

app.get(`/api/v1/routines`, async (req, res) => {
  const activities = await getRoutines();
  res.send(activities);
});

app.get(`/api/v1/activities`, async (req, res) => {
  const activities = await getActivities();
  res.send(activities);
});

app.get(`/api/v1/routines/:routineId`, async (req, res) => {
  const { routineId } = req.params;
  const routine = await getRoutine(routineId);
  res.send(routine);
});

app.get(`/api/v1/activities/:activityId`, async (req, res) => {
  const { activityId } = req.params;
  const activity = await getActivity(activityId);
  res.send(activity);
});

// posts:
app.post(`/api/v1/routines`, async (req, res) => {
  const { is_public, name, goal } = req.body;
  const newRoutine = await createRoutine(is_public, name, goal);
  res.send(newRoutine);
});

app.post(`/api/v1/activities`, async (req, res) => {
  const { name, description } = req.body;
  const newActivity = await createActivity(name, description);
  res.send(newActivity);
});

app.post(`/api/v1/routines_activities`, async (req, res) => {
  const { routine_id, activity_id, count } = req.body;
  const newCombo = await createRoutines_Activities(routine_id, activity_id, count);
  res.send(newCombo);
});

// deletes:

app.delete(`/api/v1/routines/:routinesId`, async (req, res) => {
  const { routinesId } = req.params;
  const deletedRoutines = await deleteRoutine(routinesId);
  res.send(deletedRoutines);
});

app.delete(`/api/v1/activities/:activitiesId`, async (req, res) => {
  const { activitiesId } = req.params;
  const deletedActivity = await deleteActivity(activitiesId);
  res.send(deletedActivity);
});

app.listen(8080, () => console.log(`listening on port 8080`));
