/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Fragment, useState } from "react"
import { gql, useMutation } from "@apollo/client"
import {
    Box,
    Button,
    FormLabel,
    FormControl,
    Modal,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Spinner,
    useToast,
    // Radio,
    // RadioGroup,
    useDisclosure
} from "@chakra-ui/core"
import styled from "@emotion/styled"

import { colors } from "components/utils/variables"
import { BoxFormControl, BoxInput, BoxTextarea } from "./styles"

const HeadContainer = styled(ModalHeader)`
    text-align: center;
    background: #be1e2d;
    border-color: #be1e2d;
    color: white;
    height: 100%;
`

const ButtonActive = styled(Button)`
    border: 1px solid;
    border-radius: 0.25em;
    cursor: pointer;
    font-size: 0.8em;
    border: none;
    box-shadow: none !important;
`

const FooterButton = styled(Button)`
    text-align: center;
    color: ${colors.white};
    border-color: ${colors.green};
    width: 100%;
    cursor: pointer;
`

const BoxQuery = styled(Box)`
    width: 100%;
    height: 100px;
    text-align: center;
    margin-top: 1.5em;
`

const CREATE_POST = gql`
    mutation CreatePost($title: String!, $announcement: String!, $post_img: String!) {
        createPost(data: { title: $title, announcement: $announcement, post_img: $post_img }) {
            id
            title
            announcement
            post_img
        }
    }
`

const initialState = {
    title: "",
    announcement: ""
}

export const PostCreate: React.FC = () => {
    const toast = useToast()
    const { isOpen, onClose, onOpen } = useDisclosure()

    const [{ announcement, title }, setState] = useState(initialState)
    const [image, setImage] = useState("")
    const [loadingImage, setLoadingImage] = useState(false)

    const [CreatePost, { loading }] = useMutation(CREATE_POST, {
        onCompleted: () => {
            setState({ ...initialState })
            setImage("")
            onClose()
            toast({
                title: "Post Created!",
                position: "top",
                description: "Mohon Refresh Page",
                status: "success",
                duration: 3000
            })
        }
    })

    const onChangeState = (e: any) => {
        const { id, value } = e.target

        setState(state => ({ ...state, [id]: value }))
    }

    const onUploadImage = async (e: any) => {
        const files = e.target.files
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "rabbit_images")
        setLoadingImage(true)

        const res = await fetch("https://api.cloudinary.com/v1_1/dwppcshmi/image/upload", {
            method: "post",
            body: data
        })

        const file = await res.json()
        setImage(file.secure_url)
        setLoadingImage(false)
    }

    const onCreatePost = () => {
        CreatePost({
            variables: {
                title,
                announcement,
                post_img: image
            }
        })
    }

    const onCloseModal = () => {
        setState({ ...initialState })
        setImage("")
        onClose()
    }

    return (
        <Fragment>
            <ButtonActive
                color={colors.white}
                borderColor={colors.green}
                backgroundColor={colors.green}
                _hover={{ bg: colors.green }}
                _active={{ bg: colors.green }}
                onClick={onOpen}
            >
                Tambah Post
            </ButtonActive>
            <FormControl>
                <Modal isOpen={isOpen} onClose={onCloseModal} size='xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <HeadContainer>Create Post</HeadContainer>
                        <ModalCloseButton
                            cursor='pointer'
                            backgroundColor='#be1e2d'
                            borderColor='#be1e2d'
                            borderRadius='50px'
                            color='white'
                        />
                        <ModalBody>
                            <BoxFormControl d='flex'>
                                <BoxInput id='title' value={title} onChange={onChangeState} placeholder='title' />
                                <BoxTextarea
                                    resize='vertical'
                                    id='announcement'
                                    value={announcement}
                                    onChange={onChangeState}
                                    placeholder='announcement'
                                />
                                {loadingImage ? (
                                    <BoxQuery>
                                        <Spinner />
                                    </BoxQuery>
                                ) : (
                                    <Fragment>
                                        {image ? (
                                            <img
                                                src={image}
                                                alt='post_img'
                                                style={{ width: "100%", height: "200px" }}
                                            />
                                        ) : null}
                                        <FormLabel marginTop='1em' htmlFor='image'>
                                            Upload Image <small>(Max. 2MB)</small>
                                        </FormLabel>
                                        <BoxInput type='file' id='image' onChange={onUploadImage} placeholder='image' />
                                    </Fragment>
                                )}
                            </BoxFormControl>
                        </ModalBody>
                        <ModalFooter>
                            <FooterButton
                                variantColor='green'
                                onClick={onCreatePost}
                                isDisabled={!title || !announcement || !image || loading}
                            >
                                Simpan
                            </FooterButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </FormControl>
        </Fragment>
    )
}
