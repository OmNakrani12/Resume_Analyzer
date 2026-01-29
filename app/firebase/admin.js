import admin from "firebase-admin";

if (!admin.apps.length) {
  // Validate required environment variables
  const projectId = process.env.PROJECTID;
  const clientEmail = process.env.CLIENTEMAIL;
  const privateKey = process.env.PRIVATEKEY;

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Missing Firebase Admin credentials. Please ensure PROJECTID, CLIENTEMAIL, and PRIVATEKEY are set in environment variables.'
    );
  }

  // Replace escaped newlines in private key
  const formattedPrivateKey = privateKey.replace(/\\n/g, "\n");

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey: formattedPrivateKey,
    }),
    databaseURL: process.env.NEXT_PUBLIC_DATABASEURL,
  });
}

export const adminAuth = admin.auth();
export const rtdb = admin.database();
