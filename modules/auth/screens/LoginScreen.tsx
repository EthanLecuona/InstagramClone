import AuthContent from "../components/AuthContent";
import { useState } from "react";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useUserStore } from "../../../store/UserStore";

function SigninScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const userStore = useUserStore();
  async function loginHandler({ email, password }: any) {
    setIsAuthenticating(true);
    await userStore.signIn(email, password);
    setIsAuthenticating(false);
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default SigninScreen;
