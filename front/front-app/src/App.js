import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Router from "./components/router/Router";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import * as History from "history";

import createStore from "./reducks/store/store";

const history = History.createBrowserHistory();
export const store = createStore(history);

function App() {
  return (
    <ChakraProvider>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router />
        </ConnectedRouter>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
