import firebase from "../firebase";

// var curDate = new Da/te().toLocaleString()
const db = firebase.ref("/tutorials")
// db.orderByChild("lastUpdated").startAt(curDate).on("child_added", function(snapshot) {
//   console.log(snapshot.key)
// });
// console.log(db)

const getAll = () => {
  return db;
};

const create = (data) => {
  return db.push(data);
};

const update = (key, data) => {
  return db.child(key).update(data);
};

const remove = (key) => {
  return db.child(key).remove();
};

const removeAll = () => {
  return db.remove();
};

export default {
  getAll,
  create,
  update,
  remove,
  removeAll,
};
