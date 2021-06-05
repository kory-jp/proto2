import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import Router from "./components/router/Router";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import * as History from "history";

import createStore from "./reducks/store/store";
import { LoggedInStatusProvider } from "./providers/LoggedInStatusProvider";

const history = History.createBrowserHistory();
export const store = createStore(history);

function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <LoggedInStatusProvider>
            {/* <BrowserRouter> */}
            <Router />
            {/* </BrowserRouter> */}
          </LoggedInStatusProvider>
        </ConnectedRouter>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
