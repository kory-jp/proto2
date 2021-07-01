import { extendTheme } from "@chakra-ui/react"
import "../index.css"

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "gray.100",
        color: "gray.800",
      }
    }
  }
})

export default theme