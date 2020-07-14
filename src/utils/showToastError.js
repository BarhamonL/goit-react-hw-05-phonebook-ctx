import { toast } from "react-toastify";

export default function showToastError(message) {
  return toast.error(`${message}`, { position: "top-center" });
}
