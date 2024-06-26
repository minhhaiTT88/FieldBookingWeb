import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import { RoutersConfig } from "./routes/RoutesConfig.jsx";

//thêm phần này để khởi tạo axios
import {} from "./apiHelper/connection/axiosInterceptors.js";

import { useEffect } from "react";
import Login from "./pages/Login/Index.jsx";
import { useLoginApi } from "./apiHelper/api/login.js";
import { GetAllCode } from "./apiHelper/api/shareApi.js";
import { LayoutEmpty } from "./components/layout/LayoutEmpty.jsx";
import { connectWS } from "./websocket/socket.js";

import "react-toastify/dist/ReactToastify.css";
import "./assets/scss/main.css";
import "./index.css";

function App() {
  const loginApi = useLoginApi();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.authReducer);
  const isLogin = userLogin && userLogin.UserId > 0;
  // const isLogin = true;
  const _handleVisibilityChange = (e) => {
    if (isLogin && document.visibilityState !== "hidden") {
      loginApi
        .Checkalive()
        .then((res) => {
          if (res.status !== 200) {
            dispatch({ type: "CLEAR_USER" });
          }
        })
        .catch((err) => {
          dispatch({ type: "CLEAR_USER" });
        });
    }
  };

  const _handlePostMessage = (e) => {
    if (e && e.data) {
      if (e.data.type == "RESET_TOKEN") {
        dispatch({ type: e.data.type, payload: e.data.payload });
      } else if (e.data.type == "CLEAR_USER") {
        dispatch({ type: e.data.type });
      }
    }
  };

  useEffect(() => {
    connectWS();
  }, []);

  useEffect(() => {
    document.addEventListener(
      "visibilitychange",
      _handleVisibilityChange,
      false
    );

    window.addEventListener("message", _handlePostMessage, false);

    if (userLogin) {
      _handleVisibilityChange();
      //gọi api lấy allcode
      GetAllCode()
        .then((data) => {
          if (data && data.jsondata) {
            dispatch({
              type: "SET_ALLCODE",
              payload: JSON.parse(data.jsondata),
            });
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    return () => {
      document.removeEventListener(
        "visibilitychange",
        _handleVisibilityChange,
        false
      );

      window.removeEventListener("message", _handlePostMessage, false);
    };
  }, [userLogin]);

  const getlstRouter = () => {
    let _lstRouters = [];

    _lstRouters.push({
      path: "/login",
      element: <LayoutEmpty {...{ component: Login }} />,
    });

    if (!isLogin) {
      _lstRouters.push({
        path: "*",
        element: <Navigate to="/login" replace />,
      });

      return _lstRouters;
    }
    _lstRouters.push({
      path: "/login",
      element: <Navigate to="/" replace />,
    });
    
    RoutersConfig?.filter((x) =>
      x.FunctionType.includes(userLogin?.UserType)
    )?.map((item) => {
      _lstRouters.push({
        path: item.Function_Url,
        element: item.pageLayout ? (
          <item.pageLayout {...item.pageContent} />
        ) : (
          <item.pageContent />
        ),
      });
    });

    return _lstRouters ?? [];
  };

  const router = createBrowserRouter(getlstRouter());

  return (
    <>
      <RouterProvider router={router} />

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="loader" id="Loader">
        <div className="image-container">
          <div className="image-container-two">
            {/* <img src={logo} className="image" /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
