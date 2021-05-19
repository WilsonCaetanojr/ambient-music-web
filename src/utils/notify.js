import { toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";

export const notify = function (message, autoClose, type, onClose) {
  toast(message, {
    type: type || "error",
    autoClose: autoClose === false ? false : true,
    onClose,
  });
};
