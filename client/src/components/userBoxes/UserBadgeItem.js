import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";
import { ChatState } from "../../context/ChatProvider";

const UserBadgeItem = ({ userB, handleFunction, admin }) => {

  const badgeColor = admin._id === userB._id ? "cyan" : "gray";
  const isAdmin = admin._id === userB._id;
  const { user} = ChatState();

  const isCurrentUser = user._id === userB._id;

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
      {userB.name}
      {/* {admin && <CloseIcon pl={1} />} */}
      {/* <CloseIcon pl={1} /> */}
      {!isAdmin && !isCurrentUser && <CloseIcon pl={1} />}
    </Badge>
  );
};

export default UserBadgeItem;