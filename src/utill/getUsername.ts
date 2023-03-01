export const getUsernameFromEmail = (email: string): string => {
  const atIndex = email.indexOf("@");
  return email.slice(0, atIndex);
};
