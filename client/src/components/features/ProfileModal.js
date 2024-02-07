import {Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Icon,
  Text,
  Avatar
} from "@chakra-ui/react";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <Button display={{ base: "flex" }} onClick={onOpen}>
                        <Icon as={MoreVertIcon} />
        </Button>
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent >
          <ModalHeader fontSize="30px" display="flex" justifyContent="center">
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize="25px" display="flex" justifyContent="center" flexDir="column" alignItems="center" marginBottom="20px">
            <Avatar size="lg" cursor="pointer" name={user.name} m={2}/>
            <Text>
              Email: {user.email}
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;