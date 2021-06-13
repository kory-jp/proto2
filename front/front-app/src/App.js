import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import Router from "./router/Router";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import * as History from "history";

import createStore from "./reducks/store/store";
import theme from "./theme/theme";

const history = History.createBrowserHistory();
export const store = createStore(history);

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Router />
        </ConnectedRouter>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
