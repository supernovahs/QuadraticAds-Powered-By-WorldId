import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Navigation from "./Navigation";
import { Box, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

const menu = [
  { tabName: "Ads", pageName: "/" },
  { tabName: "Fund", pageName: "/Fund" },
];

export default function Header() {
  return (
    <Box
      h={"10vh"}
      w={"100vw"}
      bg={"black"}
      display={"flex"}
      flexDir={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      px={10}
    >
      <Box display={"flex"} flexDir={"row"} alignItems={"center"}>
        <Heading mr={10}>World Ads</Heading>
        <Box display={"flex"} flexDir={"row"}>
          {menu.map((tab) => {
            return (
              <Box cursor={"pointer"} key={tab.pageName} mx={2}>
                <Link href={tab.pageName}>
                  <Text fontSize={"2xl"}>{tab.tabName}</Text>
                </Link>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box>
        <ConnectButton
          className="text-lg font-medium rounded-md bg-sky-300 hover:bg-violet-400"
          onClick={() => connect()}
        />
      </Box>
    </Box>
  );

  return (
    <div className="flex flex-col items-center mt-20">
      <div className="fixed top-0 left-0 w-screen bg-black z-2">
        <div className="p-2 flex items-center justify-between ">
          <h1 className="text-white text-3xl font-mono">WorldAds</h1>
          <div className="mr-6">
            <ConnectButton
              className="text-lg font-medium rounded-md bg-sky-300 hover:bg-violet-400 px-6 py-2 m-4 "
              onClick={() => connect()}
            />
          </div>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
