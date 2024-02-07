import { FormControl, FormLabel, Input, VStack, Text } from '@chakra-ui/react'
import { Button } from "@chakra-ui/button";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { useNavigate } from "react-router-dom";


const Signup = () => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  

  const submitHandler = async () => {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/user/register/",
        {
          name,
          email,
          password,
        },
        config
      );
      console.log(data);
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
        <Text className="login-text">Create your Account</Text>
        <FormControl id="user-name" isRequired>
            <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter User Name"
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              submitHandler();
            }
          }}
        />
        </FormControl>
        <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Email Address"
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
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(event) => {
            if (event.code === "Enter") {
              // console.log(event);
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
        SIGN UP
      </Button>
    </VStack>
  )
}

export default Signup
