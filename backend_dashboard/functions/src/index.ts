import * as functions from "firebase-functions";
import {api} from "./api/user";  
// Expose the CRUD API as a Firebase Function
export const usersApi = functions.https.onRequest(api);
