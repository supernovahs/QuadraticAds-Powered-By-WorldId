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
        <Card
          hash={images[0].hash}
          url={images[0].url}
          votes={images[0].votes}
        />
      </Box>
      <Box display={"flex"} flexDir={"column"} w={"50%"} h={"100%"}>
        <Box bg={"blackAlpha.800"} w={"100%"} h={"50%"}>
          <Card
            hash={images[1].hash}
            url={images[1].url}
            votes={images[1].votes}
          />
        </Box>
        <Box display={"flex"} flexDir={"row-reverse"} w={"100%"} h={"50%"}>
          <Box bg={"blackAlpha.300"} w={"50%"} h={"100%"}>
            <Card
              hash={images[2].hash}
              url={images[2].url}
              votes={images[2].votes}
            />
          </Box>
          <Box display={"flex"} flexDir={"column-reverse"} w={"50%"} h={"100%"}>
            <Box bg={"blackAlpha.900"} w={"100%"} h={"50%"}>
              <Card
                hash={images[3].hash}
                url={images[3].url}
                votes={images[3].votes}
              />
            </Box>
            <Box display={"flex"} flexDir={"row"} w={"100%"} h={"50%"}>
              <Box bg={"blackAlpha.500"} w={"50%"} h={"100%"}>
                <Card
                  hash={images[4].hash}
                  url={images[4].url}
                  votes={images[4].votes}
                />
              </Box>
              <Box bg={"blackAlpha.600"} w={"50%"} h={"100%"}>
                <Card
                  hash={images[5].hash}
                  url={images[5].url}
                  votes={images[5].votes}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Billboard;
