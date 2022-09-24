import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { WidgetProps } from "@worldcoin/id";
import dynamic from "next/dynamic";
import Billboard from "../components/Billboard";
import { Box } from "@chakra-ui/react";
import { useContract, useSigner } from "wagmi";
import abi from "../src/helpers/Contract.json";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
const ethers = require("ethers");

const sample = new Array(6).fill(null);

const Home: NextPage = () => {
  const { data: signer, isError, isLoading } = useSigner();
  const [Ads, SetAds] = useState();
  const [images, setImages] = useState(null);
  const [Votes, SetVotes] = useState([]);
  const provider = new ethers.providers.JsonRpcProvider(
    "https://polygon-mumbai.g.alchemy.com/v2/jrGhfalUVcb1nws18jgVaZsI9EIoi7uE"
  );
  const contract = useContract({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abi.abi,
    signerOrProvider: provider,
  });
  const getBillBoard = async () => {
    const Hashes = await contract.queryFilter(contract.filters.NewAd());
    console.log("Hashes", Hashes);
    const check = await contract.Adhash(
      "bafybeihl2az4oww6raqdcgiipoythpkcgu4daut3gxyyancgp6srq2e3di/solana.png"
    );
    console.log("Check", check);
    return Hashes.map((e) => {
      return {
        hash: e.args[0],
      };
    });
  };

  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", "dark");
    const call = async () => {
      let votes = [];
      const ad = await getBillBoard();
      console.log("ad", ad);

      const a = await contract.weightage(
        "bafybeigzv7igaxgf2rwifw65ln763z22heqkvhljvsitjsg34ki6wua6aa/Merge.png"
      );
      console.log("eth", a);

      for (let i = 0; i < ad.length; i++) {
        console.log("ad hash", ad[i].hash);
        let val = await contract.weightage(ad[i].hash);
        console.log("val in bignumber", val);
        const decodedval = ethers.BigNumber.from(val).toString();
        votes.push(decodedval);
      }
      /// Votes array is in order of the Ads arrray . ie Ads[0] 's vote == Votes[0]
      console.log("votes array", votes);

      SetAds(ad);
      SetVotes(votes);
      const data = ad.map((e, idx) => {
        console.log("parseInt", parseInt(Votes[idx]));
        return {
          url: `https://ipfs.io/ipfs/${e.hash}`,
          hash: e.hash,
          votes: parseInt(votes[idx]),
        };
      });

      data.sort((a, b) => {
        return b.votes - a.votes;
      });
      setImages(data);
      console.log("images", images);
      console.log("ad", ad);
      console.log("votes", votes);
    };
    call();
  }, []);

  return (
    <div>
      <Head></Head>

      <main>
        <Box h={"90vh"} w={"100vw"}>
          {images ? <Billboard images={images} /> : <Loader />}
        </Box>
      </main>
    </div>
  );
};

export default Home;
