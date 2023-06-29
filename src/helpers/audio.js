import sound from "../assets/sounds/message.wav";
import director from "../assets/sounds/director.wav";
// import send from "../assets/sounds/wooh.wav";
// import fcmess from "../assets/sounds/fcmess.wav";

export const beep = () => {
  let snd = new Audio(sound);
  snd.volume = 0.6;
  snd.play();
};
export const beepSend = () => {
  let snd = new Audio(sound);
  snd.volume = 1;
  snd.play();
};
export const directorSound = () => {
  let snd = new Audio(director);
  snd.volume = 1;
  snd.play();
};
