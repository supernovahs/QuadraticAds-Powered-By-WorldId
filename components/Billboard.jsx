import { AspectRatio, Box, Image } from "@chakra-ui/react";
import React from "react";
import Card from "./Card";

const Billboard = ({ images }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      // overflow={'hidden'}
      h={"100%"}
      w={"100%"}
    >
      <Box bg={"blackAlpha.400"} w={"50%"} h={"100%"} m={0}>
        <Card image={images[0]} />
      </Box>
      <Box display={"flex"} flexDir={"column"} w={"50%"} h={"100%"}>
        <Box bg={"blackAlpha.800"} w={"100%"} h={"50%"}>
          <Card image={images[1]} />
        </Box>
        <Box display={"flex"} flexDir={"row-reverse"} w={"100%"} h={"50%"}>
          <Box bg={"blackAlpha.300"} w={"50%"} h={"100%"}>
            <Card image={images[2]} />
          </Box>
          <Box display={"flex"} flexDir={"column-reverse"} w={"50%"} h={"100%"}>
            <Box bg={"blackAlpha.900"} w={"100%"} h={"50%"}>
              <Card image={images[3]} />
            </Box>
            <Box display={"flex"} flexDir={"row"} w={"100%"} h={"50%"}>
              <Box bg={"blackAlpha.500"} w={"50%"} h={"100%"}>
                <Card image={images[4]} />
              </Box>
              <Box bg={"blackAlpha.600"} w={"50%"} h={"100%"}>
                <Card image={images[5]} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Billboard;
