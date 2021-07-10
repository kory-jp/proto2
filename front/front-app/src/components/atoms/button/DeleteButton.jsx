import DefaultButton from "./DefaultButton";

export const DeleteButton = (props) => {
  const {children} = props

  return(
    <DefaultButton
      bg="gray.100"
      color="red"
      {...props}
      _hover={{
        bg: "red.400",
        color: "white"
      }}
    >
      {children}
    </DefaultButton>
  )
}

export default DeleteButton;