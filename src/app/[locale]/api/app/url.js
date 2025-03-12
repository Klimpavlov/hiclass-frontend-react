export default function getAppUrl() {
    console.log("url:", process.env.NEXT_PUBLIC_APP_URL);
    return process.env.NEXT_PUBLIC_APP_URL;
}
