export type UserProps = {
  firstname: string;
  lastname: string;
  email: string;
  id: string;
};
export type RegisterProps = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};
export type LoginProps = {
  email: string;
  password: string;
};
export type ConvertNotesProps = {
  encodedImage: string;
};
