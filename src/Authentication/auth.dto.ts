export interface SignUpBodyDTO {
  email: string;
  password: string;
}

export interface SignInBodyDTO {
  email: string;
  password: string;
}

export interface ForgetPasswordDTO {
  email: string;
}
