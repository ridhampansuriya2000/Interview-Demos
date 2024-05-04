import React, {memo} from "react";
import configureStore from "./store";
import { Provider } from "react-redux";
import Route from "./route";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "theme";
const App = () => {
  const store = configureStore();

  return (
    <>
      <ThemeProvider>
        <Provider store={store}>
          <Router>
            <Route />
          </Router>
        </Provider>
      </ThemeProvider>
    </>
  );
};

export default memo(App);
