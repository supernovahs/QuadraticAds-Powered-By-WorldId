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
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import abi from "../src/helpers/Contract.json";
import React, { useEffect, useState } from "react";
import { useContract, useSigner } from "wagmi";
import type { VerificationResponse } from "@worldcoin/id/dist/types";
import dynamic from "next/dynamic";
import { WidgetProps } from "@worldcoin/id";
const { ethers } = require("ethers");

const WorldIDWidget = dynamic<WidgetProps>(
  () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
  { ssr: false }
);

const Card = ({hash,url,votes}:{hash:string;url:string;votes:number} ) => {
  const [Proof, SetProof] = useState<VerificationResponse | null>();
  const [Cost, setCost] = useState(null);
  const { data: signer, isError, isLoading } = useSigner();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const contract = useContract({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS !== undefined ? process.env.NEXT_PUBLIC_CONTRACT_ADDRESS : '',
    contractInterface: abi.abi,
    signerOrProvider: signer,
  });

  const toast = useToast();

  const verificationSuccess = async (response: VerificationResponse) => {
    SetProof(response);
    console.log("Image.hash", hash);
    console.log(response.nullifier_hash);
    const cost = await contract.Cost(hash, response.nullifier_hash);
    console.log("cost", cost.toString());
    const a = ethers.BigNumber.from(cost).toString();
    setCost(a);
  };

  const closeModal = () => {
    setCost(null);
    onClose();
  };

  if (!hash) {
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
    <Box border={"1px solid white"} w={"100%"} h={"100%"} position={"relative"}>
      <Image
        w={"100%"}
        h={"100%"}
        src={url}
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
        Votes: {votes}
      </Tag>
      <Modal size={"2xl"} isOpen={isOpen} onClose={closeModal}>
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
              src={url}
              alt={"image"}
              objectFit={"cover"}
            />
          </ModalBody>
          <ModalFooter py={5}>
            <Box display={"flex"} flexDirection={"column"} width={"100%"}>
              <WorldIDWidget
                actionId="wid_staging_c281398b476d06d1426bb2242c05a073" // obtain this from developer.worldcoin.org
                signal={hash}
                enableTelemetry
                onSuccess={verificationSuccess}
                onError={(error) => console.error(error)}
              />

              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                flexDirection={"row"}
                w={"100%"}
                mt={5}
              >
                {Cost ? <Text>{Cost / 10 ** 18} Matic</Text> : ""}
                <Button
                  w={"30%"}
                  colorScheme={"blue"}
                  onClick={async () => {
                    const cost = await contract.Cost(
                      hash,
                      Proof?.nullifier_hash
                    );
                    console.log("cost", cost);
                    console.log("image hash", hash);
                    const a = await contract.weightage(hash);
                    console.log("a", a);

                    try {
                      await contract.Fund(
                        hash,
                        hash,
                        Proof?.merkle_root,
                        Proof?.nullifier_hash,
                        ethers.utils.defaultAbiCoder.decode(
                          ["uint256[8]"],
                          Proof?.proof
                        )[0],
                        {
                          gasLimit: 10000000,
                          value: ethers.BigNumber.from(cost).toString(),
                        }
                      );
                      toast({
                        title: "Success",
                        description: "Funding Successfull",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      });
                    } catch (error:any) {
                      toast({
                        title: "Error",
                        description: "error",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                      });
                    }
                  }}
                >
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
