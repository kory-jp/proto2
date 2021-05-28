import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/router/Router";
import { LoggedInStatusProvider } from "./providers/LoggedInStatusProvider";

function App() {
  return (
    <ChakraProvider>
      <LoggedInStatusProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </LoggedInStatusProvider>
    </ChakraProvider>
  );
}

export default App;
