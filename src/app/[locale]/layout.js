import {Inter} from 'next/font/google'
import './globals.css'
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

const inter = Inter({subsets: ['latin']})

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}
export default async function RootLayout({
                                             children,
                                             params: {locale}
                                         }) {

    const messages = await getMessages();

    return (
        <html lang={locale}>
        <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}


// prev layout file (before i18n)


// import {Inter} from 'next/font/google'
// import './globals.css'
// import {useLocale} from "next-intl";
// import {notFound} from "next/navigation";
//
// const inter = Inter({subsets: ['latin']})
//
// export const metadata = {
//     title: 'Create Next App',
//     description: 'Generated by create next app',
// }
//
// export default function RootLayout({children, params}) {
//     const locale = useLocale();
//
//     // Show a 404 error if the user requests an unknown locale
//     if (params.locale !== locale) {
//         notFound();
//     }
//
//     return (
//         // <html lang="en">
//         <html lang={locale}>
//         <body className={inter.className}>{children}</body>
//         </html>
//     )
// }