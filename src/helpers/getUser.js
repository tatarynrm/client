export const getUserName = (user, item) => {
  if (
    user.items.filter((res) => res.KOD === item.KOD_OS)[0].IMJA !== undefined
  ) {
    return user.items.filter((res) => res.KOD === item.KOD_OS)[0].IMJA;
  } else {
    return "Завантаження";
  }
};
export const getUserSurname = (user, item) => {
  if (
    user.items.filter((res) => res.KOD === item.KOD_OS)[0].PRIZV !== undefined
  ) {
    return user.items.filter((res) => res.KOD === item.KOD_OS)[0].PRIZV;
  } else {
    return "Завантаження";
  }
};
