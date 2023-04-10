import admin from "firebase-admin";

try {
  admin.initializeApp({
    // See https://firebase.google.com/docs/admin/setup#initialize-sdk
    credential: admin.credential.applicationDefault(),
    storageBucket: "REPLACE",
  });
} catch {
  console.error(
    "Error initializing Firebase admin, make sure the credentials file is in the right place"
  );
}

export default admin;
