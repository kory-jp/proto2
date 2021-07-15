import {Flex, FormControl} from "@chakra-ui/react"
import SearchIcon from '@material-ui/icons/Search';
import { Select, Input } from "@chakra-ui/react"
import { Button } from '@chakra-ui/button';

export const SearchInputForm = (props) => {
  const {keyword, 
        model, 
        onChangeKeyword, 
        onChangeModel, 
        toSearchResult, 
        onKeyDown, 
        onCompositionStart, 
        onCompositionEnd
      } = props

  return(
    <FormControl 
      id="search" 
      display="flex" 
      flexDirection={{base: "column", md: "row"}}
    >
    <Input
      type="search"
      value={keyword}
      onChange={onChangeKeyword}
      placeholder="キーワード入力"
      textAlign="center"
      bg="white"
      mr="2"
      onCompositionStart={onCompositionStart}
      onCompositionEnd={onCompositionEnd}
      onKeyDown={onKeyDown}
    />
    <Flex>
      <Select
        value={model}
        onChange={onChangeModel} 
        bg="white" 
        w="auto" 
        minW="130px"
        mr="2"
      >
        <option value="post">記事</option>
        <option value="user">ユーザー</option>
      </Select>
      <Button
        type="submit"
        name="submit"
        onClick={toSearchResult}
        disabled={keyword===""}
        shadow="md"
        >
        <SearchIcon />
      </Button>
    </Flex>
  </FormControl>
  )
}

export default SearchInputForm;