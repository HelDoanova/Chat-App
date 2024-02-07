import { FormControl, FormLabel, Input, VStack, Text } from '@chakra-ui/react'
import { Button } from "@chakra-ui/button";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../context/ChatProvider";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { setUser } = ChatState();

  const submitHandler = async() =>{
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const {data} = await axios.post(
        // "http://localhost:5000/user/login",
        "/user/login",
        { email, password },
        config
      );
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate('/chats');
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  


  return (
    <VStack>
        <Text className="login-text">Login to your Account</Text>
        <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              submitHandler();
            }
          }}
        />
        </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              submitHandler();
            }
          }}
        />
      </FormControl>
      <Button
        variant='outline'
        onClick={submitHandler}
        className="login-signup-button"
        _hover={{ bg: '#ba53ff' }}
        isLoading={loading}
      >
        LOGIN
      </Button>

    </VStack>
  )
}

export default Login;