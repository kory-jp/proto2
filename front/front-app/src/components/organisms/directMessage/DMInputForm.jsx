import { useCallback, useState } from "react";
import { Box } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react"
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import CancelIcon from '@material-ui/icons/Cancel';
import { DefaultFlex, DefaultImage } from "../../../assets/style/chakraStyles";
import PrimaryButton from "../../atoms/button/PrimaryButton";
import useLoadingState from "../../../hooks/useLoadingState";
import { useDispatch } from "react-redux";
import { updateRoom } from "../../../reducks/rooms/operations";


export const DMInputForm = (props) => {
  const {roomId, currentUserId} = props
  const [content, setContent] =  useState('');
  const [image, setImage] =  useState();
  const loadingState = useLoadingState(false)
  const dispatch = useDispatch()
  const [preview, setPreview] = useState('');

  const inputContent = useCallback((event)=> {
    setContent(event.target.value)
  }, [setContent])

  const PreviewImage = useCallback((event) => {
    const imageFile = event.target.files[0]
    setPreview(window.URL.createObjectURL(imageFile))
  },[])

  const inputImage = useCallback((event)=> {
    const file = event.target.files[0]
    setImage(file)
    PreviewImage(event)
  }, [setImage, PreviewImage])

  const createFormData = useCallback(()=> {
    const formData = new FormData();

    formData.append('message[user_id]', currentUserId)
    formData.append('message[room_id]', roomId)
    formData.append('message[content]', content)
    if (image) formData.append('message[image]', image)

    return formData
  },[currentUserId, roomId, content, image])
  const formData = createFormData();

  const onClickUpdateRoom = useCallback(()=> {
    dispatch(updateRoom(formData))
    setContent('')
    setImage()
    setPreview('')
  },[dispatch, formData])

  return(
    <>
      <DefaultFlex flexDirection="column">
        <FormControl as="form">
          <Textarea 
            placeholder="メッセージ入力..."
            rows="2"
            type="content"
            name="content"
            fontSize={{base: "sm", md: "lg"}}
            required={true}
            value={content}
            onChange={inputContent}
          />
        </FormControl>
        <FormControl id="image">
        <FormLabel>
          <AddAPhotoIcon />
        </FormLabel>
        <Input
          type="file"
          name="image"
          accept="image/*, .jpg, .jpeg, .png"
          multiple={true}
          onChange={inputImage}
          display="none"
        />
        </FormControl>
        {
          preview ?
          <Box>
            <Button
              onClick={()=> setPreview('')}
            >
              <CancelIcon />
            </Button>
            <DefaultImage 
              src={preview}
              alt="preview img"
            />
          </Box> : null
        }
        <PrimaryButton
          type="submit"
          onClick={onClickUpdateRoom}
          isLoading={loadingState}
          disabled={content === "" && image === undefined }
          fontSize={{base: "sm", md: "lg"}}
        >
          メッセージ送信
        </PrimaryButton>
      </DefaultFlex>
    </>
  )
}

export default DMInputForm;