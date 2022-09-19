import {
  Box,
  Button,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import { WorldIDWidget } from "@worldcoin/id";
import React from "react";

const Card = ({ image }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  console.log(image);
  if (!image) {
    return (
      <Box
        w={"100%"}
        h={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box w={"100%"} h={"100%"} position={"relative"}>
      <Image
        w={"100%"}
        h={"100%"}
        src={image.url}
        alt={"image"}
        objectFit={"cover"}
        onClick={onOpen}
      />
      <Tag
        size="md"
        colorScheme="blackAlpha"
        position="absolute"
        top="0"
        left="0"
        m="2"
        zIndex={100}
        color={"whiteAlpha.900"}
      >
        Votes: {image.votes}
      </Tag>
      <Modal size={"2xl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent pt={10} px={10}>
          {/* <ModalHeader>Modal Title</ModalHeader> */}
          {/* <ModalCloseButton /> */}
          <ModalBody>
            <Image
              maxH={"60vh"}
              borderRadius={10}
              w={"100%"}
              h={"100%"}
              src={image.url}
              alt={"image"}
              objectFit={"cover"}
            />
          </ModalBody>
          <ModalFooter py={5}>
            <Box display={"flex"} flexDirection={"column"} width={"100%"}>
              <WorldIDWidget />

              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDirection={"row"}
                w={"100%"}
                mt={5}
              >
                <Input w={"60%"} />
                <Button w={"30%"} colorScheme={"blue"}>
                  Fund
                </Button>
              </Box>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Card;
