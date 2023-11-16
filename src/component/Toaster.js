import React from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toaster() {
    /* switch (prop.type) {
        case "success":
            toast.success(prop.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            break;

        case "error":
            toast.error(prop.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            break;

        case "warning":
            toast.warning(prop.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            break;

        case "info":
            toast.info(prop.message, {
                position: toast.POSITION.TOP_RIGHT,
            });
            break;

        default:
            toast(prop.message, {
                position: toast.POSITION.TOP_RIGHT,
                className: "foo-bar",
            });
    } */

    return (
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      );
}