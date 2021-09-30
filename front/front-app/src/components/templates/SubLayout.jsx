import React from 'react'
import { Box, Wrap, WrapItem } from "@chakra-ui/layout";
import  backgroundImage  from "../../assets/img/backgroundImage2.jpeg"
import  explanationImage1  from "../../assets/img/explanation1.jpeg"
import  explanationImage2  from "../../assets/img/explanation2.jpeg"
import  explanationImage3  from "../../assets/img/explanation3.jpeg"
import  explanationImage4  from "../../assets/img/explanation4.jpeg"
import  explanationImage5  from "../../assets/img/explanation5.jpeg"
import { Image } from '@chakra-ui/image';
import { DefaultBox, DefaultText } from '../../assets/style/chakraStyles';
import Footer from '../organisms/layout/Footer';

export const SubLayout = (props) => {
  const {children} = props;
  return(
    <Box>
      <Image 
        src={backgroundImage}
        mr="auto"
        ml="auto"
        w={{base: "100%", md: "60%"}}
        borderRadius={{base: "none", md: "lg"}}
      />
      {children}
      <DefaultBox
        mr={{base: "0%", md: "20%"}}
        ml={{base: "0%", md: "20%"}}
      >
        <DefaultBox
          mb="6"
        >
          <Image
            src={explanationImage2}
            mr="auto"
            ml="auto"
          />
          <Box
            mt="4"
            mb="4"
            textAlign="center"
          >
            <DefaultText>
              業務でぶつかる様々な疑問や、毎年の法令改正についていけない...
            </DefaultText>
          </Box>
        </DefaultBox>
        <Box
         mb="8"
         textAlign="center"
        >
          <DefaultText
          fontSize={{base: "md", md: "xl"}}
          >
            当サイトを利用すると
          </DefaultText>
        </Box>
        <Wrap justify="center">
          <WrapItem w="400px">  
            <DefaultBox shadow="none">
              <Image
                src={explanationImage4}
                />
              <DefaultText
               mt="2"
               >
                質問を投稿すればさまざまな方から回答をいただけます!
              </DefaultText>
            </DefaultBox>
          </WrapItem>
          <WrapItem w="400px">  
            <DefaultBox shadow="none">
              <Image
                src={explanationImage3}
                />
              <DefaultText
               mt="2"
               >
                最新のニュースを解説した記事も
              </DefaultText>
            </DefaultBox>
          </WrapItem>
          <WrapItem w="400px">  
            <DefaultBox shadow="none">
              <Image
                src={explanationImage5}
                />
              <DefaultText
               mt="2"
               >
                フォローやDMで交流を広げることも
              </DefaultText>
            </DefaultBox>
          </WrapItem>
          <WrapItem w="400px">  
            <DefaultBox shadow="none">
              <Image
                src={explanationImage1}
                />
              <DefaultText
               mt="2"
               >
                さらなる成長のためさまざまな活用が可能です！
              </DefaultText>
            </DefaultBox>
          </WrapItem>
        </Wrap>
      </DefaultBox>
      <Footer />
    </Box>
  )
}

export default SubLayout;