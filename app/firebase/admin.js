import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.PROJECTID,
      clientEmail: process.env.CLIENTEMAIL,
      privateKey: process.env.PRIVATEKEY
        ? process.env.PRIVATEKEY.replace(/\\n/g, "\n")
        : undefined,
    }),
    databaseURL: process.env.DATABASEURL,
  });
}

export const auth = admin.auth();
export const rtdb = admin.database();
