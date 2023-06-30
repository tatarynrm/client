import sound from "../assets/sounds/message.wav";
import push_sound from "../assets/sounds/message_all_users.mp3"

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
  let snd = new Audio(push_sound);
  snd.volume = 1;
  snd.play();
};
export const msgToAllUsers = () => {
  let snd = new Audio(push_sound);
  snd.volume = 1;
  snd.play();
};
