import { SessionProvider } from "next-auth/react";
import { ChakraProvider, Grid } from "@chakra-ui/react";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}
