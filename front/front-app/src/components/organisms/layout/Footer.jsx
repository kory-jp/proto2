import { Box, Divider, Text } from '@chakra-ui/layout'
import { Link } from '@material-ui/core';

export const Footer = () => {
  return(
    <Box bg="white" as="footer" mt="2">
      <Box textAlign="center"> 
        <Box>
          <Text fontSize={{base: 'sm', md: "lg"}} >
            ©︎ 2021 kory-jp 
          </Text>
        </Box>
        <Divider mt="2" mb="2"/>
        <Box >
          <Link 
            href="https://github.com/kory-jp/proto2" 
            target="blank"
          >
            <Text fontSize={{base: 'sm', md: "lg"}} color="black">
              このサイトについて
            </Text>
          </Link>
        </Box>
      </Box>
    </Box>
  )
}

export default Footer;