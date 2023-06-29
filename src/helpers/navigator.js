import copyNotify from "../utils/toasts";

export const copyTextToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    copyNotify();
  } catch (error) {
    console.log(error);
  }
};
