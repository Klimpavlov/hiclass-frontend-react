// import { google } from 'googleapis';
// import serviceAccount from 'firebase-serviceAccount.json';
//
// const SCOPES = ['https://www.googleapis.com/auth/firebase.messaging'];
//
// export const getAccessToken = () => {
//     return new Promise((resolve, reject) => {
//         const jwtClient = new google.auth.JWT(
//             serviceAccount.client_email,
//             null,
//             serviceAccount.private_key,
//             SCOPES,
//             null
//         );
//         jwtClient.authorize((err, tokens) => {
//             if (err) {
//                 reject(err);
//                 return;
//             }
//             resolve(tokens.access_token);
//         });
//     });
// };
//
