export const isValidDate = (stringDate: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(stringDate);
};
