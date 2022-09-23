import React, { useState, useEffect } from "react";
import abi from "../src/helpers/Contract.json";
import { Input, Button, Box, VStack, Heading } from "@chakra-ui/react";
import { useContract, useSigner } from "wagmi";
import { WidgetProps } from "@worldcoin/id";
import type { VerificationResponse } from "@worldcoin/id/dist/types";
import dynamic from "next/dynamic";
const ethers = require("ethers");

const WorldIDWidget = dynamic<WidgetProps>(
  () => import("@worldcoin/id").then((mod) => mod.WorldIDWidget),
  { ssr: false }
);

export const Fund = React.memo(function Fund() {
  const { data: signer, isError, isLoading } = useSigner();
  const [Tx, SetTx] = useState(false);
  const [Hash, SetHash] = useState();
  const [Ad, SetAd] = useState();
  const [Proof, SetProof] = useState<VerificationResponse | null>();
  const [GroupId, SetGroupId] = useState();

  const contract = useContract({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abi.abi,
    signerOrProvider: signer,
  });

  console.log("Contract", contract);

  return (
    <Box
      h={"90vh"}
      w={"100vw"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <VStack
        w={"600px"}
        border={"1px solid white"}
        p={10}
        borderRadius={"20px"}
        gap={10}
      >
        <WorldIDWidget
          actionId="wid_staging_c281398b476d06d1426bb2242c05a073" // obtain this from developer.worldcoin.org
          signal={Ad}
          enableTelemetry
          onSuccess={(verificationResponse) => SetProof(verificationResponse)}
          onError={(error) => console.error(error)}
        />

        <VStack gap={3}>
          <Heading>Insert New Ad</Heading>
          <Input
            width={"400px"}
            placeholder="Ipfs hash .."
            value={Hash}
            onChange={(e) => SetHash(e.target.value)}
          />
          <Button
            onClick={async () => {
              SetTx(true);
              console.log("Hash", Hash);
              await contract.approveAd(Hash);
              SetHash("");
              SetTx(false);
            }}
          >
            Insert
          </Button>
        </VStack>

        <VStack gap={3}>
          <Heading>Fund New Ad</Heading>
          <Input
            placeholder="Ad you want to fund "
            value={Ad}
            onChange={(e) => SetAd(e.target.value)}
            w={"400px"}
          />

          <Button
            // disabled= {!Proof || !Ad}
            onClick={async () => {
              console.log(
                "Ad",
                Ad,
                "Merkle root",
                Proof?.merkle_root,
                "Nullifier hash",
                Proof?.nullifier_hash,
                "Proof 8",
                ethers.utils.defaultAbiCoder.decode(
                  ["uint256[8]"],
                  Proof.proof
                )[0]
              );
              await contract.Fund(
                Ad,
                Ad,
                Proof.merkle_root,
                Proof.nullifier_hash,
                ethers.utils.defaultAbiCoder.decode(
                  ["uint256[8]"],
                  Proof.proof
                )[0],
                {
                  gasLimit: 10000000,
                  value: ethers.utils.parseEther("0.01").toString(),
                }
              );
            }}
          >
            Fund
          </Button>
        </VStack>
      </VStack>
    </Box>
  );

  return (
    <div>
      <div className="border-2 border-black bg-cyan m--2 p-2 ">
        <WorldIDWidget
          actionId="wid_staging_c281398b476d06d1426bb2242c05a073" // obtain this from developer.worldcoin.org
          signal={Ad}
          enableTelemetry
          onSuccess={(verificationResponse) => SetProof(verificationResponse)}
          onError={(error) => console.error(error)}
        />
        <p className="text-3xl italic ">Insert new Ad</p>
        <Input
          placeholder="Ipfs hash .."
          value={Hash}
          onChange={(e) => SetHash(e.target.value)}
        />

        <Button
          onClick={async () => {
            SetTx(true);
            console.log("Hash", Hash);
            await contract.approveAd(Hash);
            SetHash("");
            SetTx(false);
          }}
        >
          Insert
        </Button>
      </div>

      <div className="border-2 border-black m-2 p-2 ">
        <Input
          placeholder="Ad you want to fund "
          value={Ad}
          onChange={(e) => SetAd(e.target.value)}
        />

        <Button
          // disabled= {!Proof || !Ad}
          onClick={async () => {
            console.log(
              "Ad",
              Ad,
              "Merkle root",
              Proof?.merkle_root,
              "Nullifier hash",
              Proof?.nullifier_hash,
              "Proof 8",
              ethers.utils.defaultAbiCoder.decode(
                ["uint256[8]"],
                Proof.proof
              )[0]
            );
            await contract.Fund(
              Ad,
              Ad,
              Proof.merkle_root,
              Proof.nullifier_hash,
              ethers.utils.defaultAbiCoder.decode(
                ["uint256[8]"],
                Proof.proof
              )[0],
              {
                gasLimit: 10000000,
                value: ethers.utils.parseEther("0.01").toString(),
              }
            );
          }}
        >
          Fund
        </Button>

        <Input
          placeholder="Enter Group Id "
          value={GroupId}
          onChange-={(e) => SetGroupId(e.target.value)}
        />
        <Button
          onClick={async () => {
            await contract.SetGroupId(GroupId);
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
});

export default Fund;
