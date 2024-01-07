import { Provider } from "react-redux";

// Local imports
import { store } from "./redux/store";
import Main from "./screens/Main";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
