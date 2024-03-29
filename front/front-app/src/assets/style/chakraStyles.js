import { Box, Flex } from "@chakra-ui/layout";
import { Text, Image, Button } from "@chakra-ui/react";

export const DefaultBox = (props) => {
  return (
    <Box
      bg="white"
      p={{ base: 2, md: 5 }}
      shadow="md"
      borderRadius="md"
      {...props}
    />
  );
};

export const DefaultFlex = (props) => {
  return (
    <Flex
      bg="white"
      p={{ base: 2, md: 5 }}
      shadow="md"
      borderRadius="md"
      {...props}
    />
  );
};

export const DefaultText = (props) => {
  return (
    <Text
      fontSize={{ base: "xs", md: "lg" }}
      wordBreak="break-word"
      {...props}
    />
  );
};

export const DefaultTitleText = (props) => {
  return (
    <Text
      fontSize={{ base: "sm", md: "2xl" }}
      color="gray.600"
      display="flex"
      alignItems="center"
      {...props}
    />
  );
};

export const DefaultImage = (props) => {
  return (
    <Image
      boxSize={{ base: "2xs", md: "md" }}
      minH="200px"
      minw="130px"
      objectFit="cover"
      shadow="md"
      borderRadius="md"
      {...props}
    />
  );
};

export const DefaultUserIconImage = (props) => {
  return (
    <Image
      boxSize={{ base: "40px", md: "60px" }}
      objectFit="cover"
      shadow="md"
      borderRadius="full"
      {...props}
    />
  );
};

export const UsersPageButton = (props) => {
  return (
    <Button
      colorScheme="teal"
      variant="ghost"
      fontSize={{ base: "5px", md: "lg" }}
      {...props}
    />
  );
};
