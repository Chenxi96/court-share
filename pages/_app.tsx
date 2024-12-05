import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider} from "@chakra-ui/react";


const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  );
};

export default App;
