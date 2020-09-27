import firebase from "firebase/app";
//import "firebase/firestore";
import "firebase/auth";
import "firebase/firebase-firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAQFHQ9_-jD87_kI0Ge7RLxvny4IxMh7bo",
  authDomain: "myweb-d3f58.firebaseapp.com",
  databaseURL: "https://myweb-d3f58.firebaseio.com",
  projectId: "myweb-d3f58",
  storageBucket: "myweb-d3f58.appspot.com",
  messagingSenderId: "1061977079625",
  appId: "1:1061977079625:web:f4b1c12ab9f5d2e55aa498",
};

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }
  //#region Auth
  login(email, password) {
    try {
      return this.auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      alert(err);
      return null;
    }
  }
  async register(email, password, firstName, lastName) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: firstName + " " + lastName,
    });
  }
  logOut() {
    return this.auth.signOut();
  }
  getUser() {
    return this.auth.currentUser();
  }
  authChange(user) {
    return this.auth.onAuthStateChanged(user);
  }
  //#endregion
  //---------------------------------------
  //#region STOCK_ITEMS
  async GET_All_STOCK_ITEMS() {
    var itm = [];
    var coll = this.db.collection("STOCK_ITEMS").orderBy("category");
    const documentSnapshots = await coll.get();
    documentSnapshots.docs.map((d) => {
      return itm.push({ id: d.id, ...d.data() });
    });
    return itm;
  }
  async GET_STOCK_ITEM_by(pref, value) {
    var itm = [];
    var coll = this.db.collection("STOCK_ITEMS").where(pref, "==", value);
    const documentSnapshots = await coll.get();
    documentSnapshots.docs.map((d) => {
      return itm.push({ id: d.id, ...d.data() });
    });
    return itm;
  }
  async INSERT_STOCK_ITEM(item) {
    await this.db.collection("STOCK_ITEMS").add(item);
  }
  async UPDATE_STOCK_ITEM(item, id) {
    await this.db.collection("STOCK_ITEMS").doc(id).update(item);
  }
  async Delete_STOCK_ITEM(id) {
    await this.db.collection("STOCK_ITEMS").doc(id).delete();
  }
  //#endregion
  //---------------------------------------
  //#region INVOICES
  async GET_INVOICES(startDate, endDate) {
    var itm = [];
    var coll = this.db
      .collection("INVOICES")
      .where("date", ">", new Date(startDate))
      .where("date", "<", new Date(endDate))
      .orderBy("date", "desc");
    const documentSnapshots = await coll.get();
    documentSnapshots.docs.map((d) => {
      return itm.push({ id: d.id, ...d.data() });
    });
    return itm;
  }
  async GET_INVOICE_by(pref, value) {
    var itm = [];
    var coll = this.db.collection("INVOICES").where(pref, "==", value);
    const documentSnapshots = await coll.get();
    documentSnapshots.docs.map((d) => {
      return itm.push({ id: d.id, ...d.data() });
    });
    return itm;
  }
  async INSERT_INVOICE(item) {
    await this.db.collection("INVOICES").add(item);
  }
  async UPDATE_INVOICE(item, id) {
    await this.db.collection("INVOICES").doc(id).update(item);
  }
  async Delete_INVOICE(id) {
    await this.db.collection("INVOICES").doc(id).delete();
  }
  //#endregion
  //---------------------------------------
  //#region OUTLAY
  async GET_OUTLAY(startDate, endDate) {
    var itm = [];
    var coll = this.db
      .collection("OUTLAY")
      .where("date", ">", new Date(startDate))
      .where("date", "<", new Date(endDate))
      .orderBy("date", "desc");
    const documentSnapshots = await coll.get();
    documentSnapshots.docs.map((d) => {
      return itm.push({ id: d.id, ...d.data() });
    });
    return itm;
  }
  async GET_OUTLAY_by(pref, value) {
    var itm = [];
    var coll = this.db.collection("OUTLAY").where(pref, "==", value);
    const documentSnapshots = await coll.get();
    documentSnapshots.docs.map((d) => {
      return itm.push({ id: d.id, ...d.data() });
    });
    return itm;
  }
  async INSERT_OUTLAY(item) {
    await this.db.collection("OUTLAY").add(item);
  }
  async UPDATE_OUTLAY(item, id) {
    await this.db.collection("OUTLAY").doc(id).update(item);
  }
  async Delete_OUTLAY(id) {
    await this.db.collection("OUTLAY").doc(id).delete();
  }
  //#endregion
  //---------------------------------------
  //#region COSTUMER
  async GET_All_COSTUMERS() {
    var itm = [];
    var coll = this.db.collection("COSTUMERS").orderBy("name");
    const documentSnapshots = await coll.get();
    documentSnapshots.docs.map((d) => {
      return itm.push({ id: d.id, ...d.data() });
    });
    return itm;
  }
  async GET_COSTUMER_by(pref, value) {
    var itm = [];
    var coll = this.db.collection("COSTUMERS").where(pref, "==", value);
    const documentSnapshots = await coll.get();
    documentSnapshots.docs.map((d) => {
      return itm.push({ id: d.id, ...d.data() });
    });
    return itm;
  }
  async INSERT_COSTUMER(item) {
    await this.db.collection("COSTUMERS").add(item);
  }
  async UPDATE_COSTUMER(item, id) {
    await this.db.collection("COSTUMERS").doc(id).update(item);
  }
  async Delete_COSTUMER(id) {
    await this.db.collection("COSTUMERS").doc(id).delete();
  }
  //#endregion
  //---------------------------------------
  //#region DEBTS
  async GET_All_DEBTS() {
    var itm = [];
    var coll = this.db.collection("DEBTS").orderBy("date");
    const documentSnapshots = await coll.get();
    documentSnapshots.docs.map((d) => {
      return itm.push({ id: d.id, ...d.data() });
    });
    return itm;
  }
  async GET_DEBTS_by(pref, value) {
    var itm = [];
    var coll = this.db.collection("DEBTS").where(pref, "==", value);
    const documentSnapshots = await coll.get();
    documentSnapshots.docs.map((d) => {
      return itm.push({ id: d.id, ...d.data() });
    });
    return itm;
  }
  INSERT_DEBTS(item) {
    this.db
      .collection("DEBTS")
      .add(item)
      .then(function () {
        console.log("DEBTS successfully Saved!");
      })
      .catch(function (error) {
        console.error("Error Saving DEBTS: ", error);
      });
  }
  UPDATE_DEBTS(item, id) {
    this.db
      .collection("DEBTS")
      .doc(id)
      .update(item)
      .then(function () {
        console.log("DEBTS successfully updated!");
      })
      .catch(function (error) {
        console.error("Error updating DEBTS: ", error);
      });
  }
  Delete_DEBTS(id) {
    this.db
      .collection("DEBTS")
      .doc(id)
      .delete()
      .then(function () {
        console.log("DEBTS successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing DEBTS: ", error);
      });
  }
  //#endregion
  //---------------------------------------
  //#region JOBS
  async GET_All_JOBS() {
    let d = new Date().getDate() - 10;
    let m = new Date().getMonth();
    let y = new Date().getFullYear();
    let ff = new Date(y, m, d, 0, 0, 0, 0);

    var itm = [];
    var coll = this.db
      .collection("JOBS")
      .where("date", ">", ff)
      .orderBy("date");
    const documentSnapshots = await coll.get();
    documentSnapshots.docs.map((d) => {
      return itm.push({ id: d.id, ...d.data() });
    });
    return itm;
  }
  async GET_JOBS_by(pref, value) {
    var itm = [];
    var coll = this.db.collection("JOBS").where(pref, "==", value);
    const documentSnapshots = await coll.get();
    documentSnapshots.docs.map((d) => {
      return itm.push({ id: d.id, ...d.data() });
    });
    return itm;
  }
  async INSERT_JOBS(item) {
    await this.db.collection("JOBS").add(item);
  }
  async UPDATE_JOBS(item, id) {
    await this.db.collection("JOBS").doc(id).update(item);
  }
  async Delete_JOBS(id) {
    await this.db.collection("JOBS").doc(id).delete();
  }
  //#endregion
  //---------------------------------------
  //#region GLOBAL_VALUES
  async GET_GLOBAL_VALUES() {
    var itm = [];
    var coll = this.db.collection("GLOBAL_VALUES");
    const documentSnapshots = await coll.get();
    documentSnapshots.docs.map((d) => {
      return itm.push({ id: d.id, ...d.data() });
    });
    return itm;
  }
  async UPDATE_GLOBAL_VALUES(item) {
    await this.db
      .collection("GLOBAL_VALUES")
      .doc("Ln597g8X79ZrKThqpRhi")
      .update(item);
  }
  //#endregion
  //---------------------------------------
}

export default new Firebase();
