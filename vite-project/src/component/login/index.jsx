import { useState, useEffect } from "react";
import {
  usePostLoginMutation,
  usePostSignupMutation,
} from "@/component/store/store";
const LogIn = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegsiter] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignup] = usePostSignupMutation();
  return <div></div>;
};

export default LogIn;
