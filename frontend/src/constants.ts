export interface Item {
  name: string;
  description: string;
  price: Number;
  image: string;
  _id: string;
};

export interface ErrorResponse {
  error: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface SignUpData {
  name: string;
  username: string;
  password: string;
  confirmPassword ?: string;
}
