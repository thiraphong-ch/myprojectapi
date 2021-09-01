import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { ToastProvider } from "react-toast-notifications";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import DetailPage from "./pages/DetailPage";
import HospitalPage from "./pages/hospital/HospitalPage";
import CategoryIndexPage from "./pages/category/CategoryIndexPage";
import CreatePage from "./pages/category/CreatePage";
import EditPage from "./pages/category/EditPage";
import UploadPage from "./pages/UploadPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
// import { LoginPage } from "./pages/LoginPage";
import MemberPage from "./pages/MemberPage";
import CartPage from "./pages/CartPage";

import PrivateRoute from "./guard/auth";
import UserStoreProvider from "./context/UserContext";

//React-PDF 
import PdfReport from "./pages/report/PdfReport";

//redux setup
import { Provider } from "react-redux";
// import { createStore } from "redux";  // ของเดิม ที่ไม่ได้ใช้ persist
// import rootReducer from "./redux/reducers/index";  // ของเดิม ที่ไม่ได้ใช้ persist
// import { PersistGate } from "redux-persist/integration/react";

//Redux Thunk Setup
// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';



import {
  Font,
} from "@react-pdf/renderer";

// const store = createStore(rootReducer); // ของเดิม ที่ไม่ได้ใช้ persist
import configureStore from "./redux/configureStore";
import ChartReport from "./pages/report/ChartReport";
const { store } = configureStore(); // ของ redux persist

//Redux Thunk Setup
// const store = createStore(rootReducer, applyMiddleware(thunk));

const queryClient = new QueryClient();

Font.register({
  family: "Sarabun",
  fonts: [{ src: "./fonts/Sarabun/Sarabun-Regular.ttf" }],
});

const App = () => {
  return (
    <Provider store={store} style={Font}>
      <UserStoreProvider>
        <ToastProvider
          autoDismiss
          autoDismissTimeout={3000}
          placement="bottom-right"
        >
          <QueryClientProvider client={queryClient}>
            <Router basename="/">
              <NavBar />
              <Switch>
                <Route exact path="/">
                  <HomePage />
                </Route>
                <Route path="/about">
                  <AboutPage />
                </Route>
                <Route path="/product">
                  <ProductPage />
                </Route>
                <Route path="/detail/:id/title/:title">
                  <DetailPage />
                </Route>
                <Route path="/hospital">
                  <HospitalPage />
                </Route>
                <Route path="/upload">
                  <UploadPage />
                </Route>
                <Route path="/cart">
                  <CartPage />
                </Route>

                <PrivateRoute path="/member">
                  <MemberPage />
                </PrivateRoute>

                <Route path="/register">
                  <RegisterPage />
                </Route>
                <Route path="/login">
                  <LoginPage />
                </Route>
                <Route path="/pdf">
                  <PdfReport />
                </Route>

                <Route path="/chart">
                  <ChartReport />
                </Route>

                <Route
                  path="/category"
                  render={({ match: { url } }) => (
                    <>
                      <Route path={`${url}/`} exact>
                        <CategoryIndexPage />
                      </Route>
                      <Route path={`${url}/create`}>
                        <CreatePage />
                      </Route>
                      <Route path={`${url}/edit/:id`}>
                        <EditPage />
                      </Route>
                    </>
                  )}
                ></Route>
              </Switch>
              <Footer />
            </Router>
          </QueryClientProvider>
        </ToastProvider>
      </UserStoreProvider>
    </Provider>
  );
};

export default App;
