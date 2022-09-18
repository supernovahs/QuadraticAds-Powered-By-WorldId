import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { WidgetProps } from "@worldcoin/id";
import dynamic from "next/dynamic";
import Billboard from "../components/Billboard";
import { Box } from "@chakra-ui/react";
import { useContract, useSigner } from "wagmi";
import abi from "../src/helpers/Contract.json";
import { useEffect,useState } from "react";
const ethers = require("ethers");

const images = [
  "https://bit.ly/naruto-sage",
  "https://bit.ly/naruto-sage",
  "https://bit.ly/naruto-sage",
  "https://bit.ly/naruto-sage",
  "https://bit.ly/naruto-sage",
  "https://bit.ly/naruto-sage",
];

const Home: NextPage = () => {
  const { data: signer, isError, isLoading } = useSigner();
  const [Ads,SetAds] = useState();
  const [Votes,SetVotes] = useState([]);
  const provider = new ethers.providers.JsonRpcProvider("https://polygon-mumbai.g.alchemy.com/v2/jrGhfalUVcb1nws18jgVaZsI9EIoi7uE");
  const contract = useContract({
    addressOrName: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    contractInterface: abi.abi,
    signerOrProvider: provider,
  });
  console.log("Contract",contract);


  const getBillBoard = async () =>{
    const Hashes = await contract.queryFilter(contract.filters.NewAd());

   return (Hashes.map((e)=>{
      return {
        hash: e.args[0].hash
      }

   }))
  }

  useEffect(()=>{
    const call = async ()=>{
      let votes = [];
      const ad = await getBillBoard();
      console.log("ad",ad);
      for(let i=0; i<ad.length;i++){
        let val = await contract.weightage(ad[i]);
        const decodedval = ethers.BigNumber.from(val).toString();
        votes.push(decodedval);
      }
      /// Votes array is in order of the Ads arrray . ie Ads[0] 's vote == Votes[0]
      SetVotes(votes);

      SetAds(ad);
      console.log("ad",ad);
      console.log("votes",votes);
    }
    call();
  },[])


  return (
    <div>
      <Head></Head>

      <main>
        <Box h={"90vh"} w={"100vw"}>
          <Billboard images={images} />
        </Box>
      </main>
    </div>
  );
};

export default Home;
