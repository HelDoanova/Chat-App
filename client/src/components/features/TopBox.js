import { useState } from "react";
import { Box} from "@chakra-ui/layout";
import { Tooltip } from "@chakra-ui/tooltip";
import { Button, Avatar, Icon} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { SearchIcon } from '@chakra-ui/icons'
import LogoutIcon from '@mui/icons-material/Logout';
import { ChatState } from "../../context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useDisclosure } from "@chakra-ui/hooks";
import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay } from "@chakra-ui/modal";
import { Input } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../userBoxes/UserListItem";
import { Spinner } from "@chakra-ui/spinner";
import GroupChatModal from "./GroupChatModal";
import { AddIcon } from "@chakra-ui/icons";


const TopBox = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {user, setSelectedChat, chats, setChats} = ChatState();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  //Sidebar
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something to search",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      // const { data } = await axios.get(`http://localhost:5000/user?search=${encodeURIComponent(search)}`, config);
      const { data } = await axios.get(`/user?search=${encodeURIComponent(search)}`, config);
     // Filter 
      const filteredUsers = data.filter(user => new RegExp(`^${search}`, 'i').test(user.name));

      setLoading(false);
      setSearchResult(filteredUsers);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to load the users",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      // const { data } = await axios.post(`http://localhost:5000/chat`, { userId }, config);
      const { data } = await axios.post(`/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }

  return (
    <>
        <Box className="top-area">
            <div>
              <Button leftIcon={<SearchIcon />}  variant='ghost' onClick={onOpen}>
                  Search User
              </Button>
            <GroupChatModal>
            <Button
             variant='ghost'
              fontSize={{lg: "15px" }}
              rightIcon={<AddIcon />}
            >
              New Group Chat
            </Button>
          </GroupChatModal>
              </div>
            <div className="sidebar-buttons-right">
                <ProfileModal user={user}>
                    <Tooltip label="Profile" hasArrow placement="bottom-end">
                      <Avatar size="sm" cursor="pointer" name={user.name} m={1}/>
                    </Tooltip>
                </ProfileModal>
                <Tooltip label="Logout" hasArrow placement="bottom-end">
                  <Button variant='ghost' onClick={logoutHandler}>
                          <Icon as={LogoutIcon} />
                  </Button>
                </Tooltip>
            </div>
        </Box>

        {/* Left Search Sidebar */}
        <Drawer placement="left" onClose={onClose} isOpen={isOpen} borderRadius="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
        <DrawerBody >
        <Box display="flex" pb={2}>
            <Input
            placeholder="Search by name or email"
            w="150%"
            mr={2}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
            <Button  onClick={handleSearch}>Search</Button>
        </Box>
        {loading ? (
            <ChatLoading />
        ) : (
            searchResult?.map((user) => (
            <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => accessChat(user._id)}
            />
            ))
        )}
        {loadingChat && <Spinner ml="auto" display="flex" />}
        </DrawerBody>
        </DrawerContent>
      </Drawer>

    </>
  )
}

export default TopBox
