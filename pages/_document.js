import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <meta name="description" content="NFT Viewer DApp" />
                <meta
                    name="keywords"
                    content="NFTs Token Non-fungible Etherscan Opensea"
                />
                <meta name="author" content="NFTs Inc." />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="icon" href="favicon.ico" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="true"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Didact+Gothic&family=Nunito:wght@200&family=Poppins:wght@400&family=Quicksand:wght@300&family=Ubuntu:wght@300&display=swap"
                    rel="stylesheet"
                />
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
