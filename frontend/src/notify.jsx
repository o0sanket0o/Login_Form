import toast from "react-hot-toast";

export const handleError = (error) =>{
    toast.error(error);
}
export const handleSuccess = (message) => {
    toast.success(message);
}