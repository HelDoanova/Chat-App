import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItemUpdate = ({ user, handleFunction }) => {

  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      bg="#ba53ff"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
    </Badge>
  );
};

export default UserBadgeItemUpdate;