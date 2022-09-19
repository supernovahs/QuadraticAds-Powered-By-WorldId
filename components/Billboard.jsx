import { AspectRatio, Box, Image } from "@chakra-ui/react";
import React from "react";

const Billboard = ({ images }) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"row"}
      // overflow={'hidden'}
      h={"100%"}
      w={"100%"}
    >
      <Box bg={"blue.100"} w={"50%"} h={"100%"} m={0}>
        <Image
          w={"100%"}
          h={"100%"}
          src={images[0].url}
          alt={"image"}
          objectFit={"cover"}
        />
      </Box>
      <Box display={"flex"} flexDir={"column"} w={"50%"} h={"100%"}>
        <Box bg={"blue.200"} w={"100%"} h={"50%"}>
          <Image
            w={"100%"}
            h={"100%"}
            src={images[1].url}
            alt={"image"}
            objectFit={"cover"}
          />
        </Box>
        <Box display={"flex"} flexDir={"row-reverse"} w={"100%"} h={"50%"}>
          <Box bg={"blue.300"} w={"50%"} h={"100%"}>
            <Image
              w={"100%"}
              h={"100%"}
              src={images[2].url}
              alt={"image"}
              objectFit={"cover"}
            />
          </Box>
          <Box display={"flex"} flexDir={"column-reverse"} w={"50%"} h={"100%"}>
            <Box bg={"blue.400"} w={"100%"} h={"50%"}>
              <Image
                w={"100%"}
                h={"100%"}
                src={images[3].url}
                alt={"image"}
                objectFit={"cover"}
              />
            </Box>
            <Box display={"flex"} flexDir={"row"} w={"100%"} h={"50%"}>
              <Box bg={"blue.500"} w={"50%"} h={"100%"}>
                <Image
                  w={"100%"}
                  h={"100%"}
                  src={images[4].url}
                  alt={"image"}
                  objectFit={"cover"}
                />
              </Box>
              <Box bg={"blue.600"} w={"50%"} h={"100%"}>
                <Image
                  w={"100%"}
                  h={"100%"}
                  src={images[5].url}
                  alt={"image"}
                  objectFit={"cover"}
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
