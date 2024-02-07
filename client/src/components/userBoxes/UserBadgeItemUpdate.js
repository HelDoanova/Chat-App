import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";
import { ChatState } from "../../context/ChatProvider";

const UserBadgeItemUpdate = ({ user1, handleFunction, admin }) => {

  const { user } = ChatState();
  const isCurrentUser = user._id === user1._id;

  const badgeColor = admin._id === user1._id ? "cyan" : "gray";
  const isAdmin = admin._id === user1._id;

  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme={badgeColor}
      cursor="pointer"
      onClick={handleFunction}
    >
      {user1.name}
      {/* {admin && <CloseIcon pl={1} />} */}
      {/* <CloseIcon pl={1} /> */}
      {/* {!isAdmin && <CloseIcon pl={1} />} */}
      {!isAdmin && !isCurrentUser &&<CloseIcon pl={1} />}
    </Badge>
  );
};

export default UserBadgeItemUpdate;