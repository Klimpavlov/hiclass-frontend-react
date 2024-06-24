import { GoogleAuth } from 'google-auth-library';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    try {
        const serviceAccountPath = path.join(process.cwd(), 'firebase-serviceAccount.json');
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

        const auth = new GoogleAuth({
            credentials: serviceAccount,
            scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
        });

        const client = await auth.getClient();
        const accessToken = await client.getAccessToken();

        res.status(200).json({ accessToken: accessToken.token });
    } catch (error) {
        console.error('Failed to get access token:', error);
        res.status(500).json({ error: 'Failed to get access token' });
    }
}
