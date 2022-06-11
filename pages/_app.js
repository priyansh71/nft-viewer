import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import "../styles/globals.css";

const theme = extendTheme({
    styles: {
        global: {
            body: {
                fontFamily: [
                    "Nunito",
                    "Quicksand",
                    "Didact Gothic",
                    "Poppins",
                    "Ubuntu",
                ],
            },
        },
    },
    components: {
        Button: { baseStyle: { _focus: { boxShadow: "none" } } },
        Link: { baseStyle: { _focus: { boxShadow: "none" } } },
        Input: { baseStyle: { _focus: { boxShadow: "none" } } },
    },
    breakpoints: {
        sm: "320px",
        md: "768px",
        lg: "1200px",
        xl: "1280px",
        "2xl": "1536px",
    },
});

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
}

export default MyApp;