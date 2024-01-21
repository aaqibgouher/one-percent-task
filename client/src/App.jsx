import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import SnackbarComponent from "./components/helper/SnackbarComponent";
import PrivateRoute from "./middleware/PrivateRoute";
import DialogComponent from "./components/helper/DialogComponent";

function App() {
  return (
    <>
      <Router>
        <DialogComponent />
        <SnackbarComponent />
        <Routes>
          {/* Auth routes */}
          <Route exact path="/" element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/todo" element={<HomePage />} />
          </Route>

          {/* Non auth routes */}
          <Route path="/register" element={<AuthPage />}></Route>
          <Route path="/login" element={<AuthPage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
