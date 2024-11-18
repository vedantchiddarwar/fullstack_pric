import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import {Request, Response} from "express";

admin.initializeApp();
const db = admin.firestore();

export const api = functions.https.onRequest(
    async (req: Request, res: Response): Promise<void> => {
        const usersCollection = db.collection("user");

        try {
            switch (req.method) {
                // READ: Fetch all users
                case "GET": {
                    const snapshot = await usersCollection.get();
                    const users = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    res.status(200).json(users); // Do not return this
                    break;
                }

                // CREATE: Add a new user
                case "POST": {
                    const newUser = req.body as { name: string; email: string; age: number };
                    const addedUser = await usersCollection.add(newUser);
                    res.status(201).json({id: addedUser.id, ...newUser});
                    break;
                }

                // UPDATE: Update an existing user by ID
                case "PUT": {
                    const {id} = req.query as {id: string};
                    const updatedData = req.body as { name?: string; email?: string; age?: number };
                    await usersCollection.doc(id).update(updatedData);
                    res.status(200).json({id, ...updatedData});
                    break;
                }

                // DELETE: Delete a user by ID
                case "DELETE": {
                    const {id} = req.query as {id: string};
                    await usersCollection.doc(id).delete();
                    res.status(200).json({success: true, id});
                    break;
                }

                default:
                    res.status(405).json({error: "Method Not Allowed"});
                    break;
            }
        } catch (error: any) {
            res.status(500).json({error: error.message}); // Log the error without returning
        }
    }
);
