import React from 'react'
import {Box,Container,Tab,TabList,TabPanel,TabPanels,Tabs} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import './myStyles.css';
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";

function Homepage () {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats");
  }, [navigate]);


  return (
    <Container maxW="xl" centerContent>
      <Box className="login-container2">
        <Tabs variant='soft-rounded'>
          <TabList mb="1em">
            <Tab className="login-signup">Login</Tab>
            <Tab className="login-signup">Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage;
