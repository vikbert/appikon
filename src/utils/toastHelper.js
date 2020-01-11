import toast from "native-toast";
export const errorToast = message => {
  toast({
    message: message,
    type: "error",
    timeout: 5000,
    edge: true
  });
};

export const successToast = message => {
  toast({
    message: message,
    type: "success",
    timeout: 5000,
    edge: true
  });
};
