import { FirebaseError } from "firebase/app";
import { User } from "firebase/auth";

export type RegisterForm = {
  name    : string;
  email   : string;
  password: string;
}

export type LoginForm = {
  email   : string;
  password: string;
}

export type AuthProps = {
  token   : string | null  
  user    : User | null,
  loading : boolean,
  error   : FirebaseError | null
}