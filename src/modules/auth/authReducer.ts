interface AuthState {
  isAuthenticated: boolean;
  isAuthenticating: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isAuthenticating: false,
};

export function authReducer() {
  return initialState;
}
