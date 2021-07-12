import DefaultButton from "./DefaultButton";

export const PrimaryButton = (props) => {
  const  {children } = props;
  return(
    <DefaultButton
      bg="gray.400"
      color="white"
      {...props}
    >
      {children}
    </DefaultButton>
  )
}

export default PrimaryButton;