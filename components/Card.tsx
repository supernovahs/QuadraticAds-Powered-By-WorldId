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
} from "@chakra-ui/react";
import abi from "../src/helpers/Contract.json";
import React, { useEffect, useState } from "react";
import { useContract, useSigner } from "wagmi";
import type { VerificationResponse } from "@worldcoin/id/dist/types";
import dynamic from "next/dynamic";
const { ethers } = require("ethers");

const WorldIDWidget = dynamic<WidgetProps>(
  () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
  { ssr: false }
);

const Card = ({ image }) => {
  const [Proof, SetProof] = useState<VerificationResponse | null>();
  const [Cost, setCost] = useState(null);
  const { data: signer, isError, isLoading } = useSigner();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const contract = useContract({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abi.abi,
    signerOrProvider: signer,
  });

  const verificationSuccess = async (response:VerificationResponse) => {
    SetProof(response);
    console.log("Image.hash",image.hash);
    console.log(response.nullifier_hash);
    const cost = await contract.Cost(image.hash, response.nullifier_hash);
    console.log("cost",cost.toString());
    const a = ethers.BigNumber.from(cost).toString();
    setCost(a);
  };



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
              <WorldIDWidget
                actionId="wid_staging_c281398b476d06d1426bb2242c05a073" // obtain this from developer.worldcoin.org
                signal={image.hash}
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
                {Cost ? (<Text>{((Cost/10**18)) } Matic</Text>) : ""}
                <Button
                  w={"30%"}
                  colorScheme={"blue"}
                  onClick={async () => {
                    const cost = await contract.Cost(
                      image.hash,
                      Proof?.nullifier_hash
                    );
                    console.log("cost", cost);
                    console.log("image hash", image.hash);
                    const a = await contract.weightage(image.hash);
                    console.log("a", a);
                    await contract.Fund(
                      image.hash,
                      image.hash,
                      Proof.merkle_root,
                      Proof.nullifier_hash,
                      ethers.utils.defaultAbiCoder.decode(
                        ["uint256[8]"],
                        Proof.proof
                      )[0],
                      {
                        gasLimit: 10000000,
                        value: ethers.BigNumber.from(cost).toString(),
                      }
                    );
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
