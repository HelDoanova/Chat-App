import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = ({ user, handleFunction, admin }) => {

  const badgeColor = admin._id === user._id ? "cyan" : "gray";
  const isAdmin = admin._id === user._id;

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
      {user.name}
      {/* {admin && <CloseIcon pl={1} />} */}
      {/* <CloseIcon pl={1} /> */}
      {!isAdmin && <CloseIcon pl={1} />}
    </Badge>
  );
};

export default UserBadgeItem;