import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

// Initialize Firebase Admin
admin.initializeApp();

// Initialize Firestore
const db = admin.firestore();

// Configure CORS
const corsHandler = require("cors")({
    origin: true,
});

export {admin, db, functions, corsHandler};