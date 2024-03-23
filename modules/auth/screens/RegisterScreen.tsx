import AuthContent from "../components/AuthContent";
import { useNavigation } from "@react-navigation/native";
import { useUserStore } from "../../../store/UserStore";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { useState } from "react";

function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const userStore = useUserStore();
  async function signupHandler({ email, password }: any) {
    setIsAuthenticating(true);
    await userStore.signUp(email, password);
    setIsAuthenticating(false);
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }
  return <AuthContent isLogin={false} onAuthenticate={signupHandler} />;
}

export default SignupScreen;
