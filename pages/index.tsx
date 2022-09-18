import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { WidgetProps } from "@worldcoin/id";
import dynamic from "next/dynamic";
import Billboard from "../components/Billboard";
import { Box } from "@chakra-ui/react";

const images = [
  "https://bit.ly/naruto-sage",
  "https://bit.ly/naruto-sage",
  "https://bit.ly/naruto-sage",
  "https://bit.ly/naruto-sage",
  "https://bit.ly/naruto-sage",
  "https://bit.ly/naruto-sage",
];

const Home: NextPage = () => {
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
