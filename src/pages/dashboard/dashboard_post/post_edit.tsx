/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Fragment, useState, useEffect } from "react"
import {
    Button,
    Box,
    FormLabel,
    FormControl,
    Modal,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Spinner
    // Avatar
    // Radio,
    // RadioGroup,
} from "@chakra-ui/core"
import { gql, useQuery, useMutation } from "@apollo/client"
import styled from "@emotion/styled"

import { colors } from "components/utils/variables"
import { BoxFormControl, BoxInput, BoxTextarea } from "./styles"

const BoxQuery = styled(Box)`
    width: 100%;
    height: 100px;
    text-align: center;
    margin-top: 1.5em;
`

const HeadContainer = styled(ModalHeader)`
    text-align: center;
    background: #be1e2d;
    border-color: #be1e2d;
    color: white;
    height: 100%;
`

const FooterButton = styled(Button)`
    text-align: center;
    color: ${colors.white};
    border-color: ${colors.green};
    width: 100%;
    cursor: pointer;
`

const GET_POST = gql`
    query GetPostById($id: String!) {
        getPostById(id: $id) {
            id
            tanggal
            title
            announcement
            post_img
        }
    }
`

const UPDATE_POST = gql`
    mutation UpdatePost($title: String!, $announcement: String!, $post_img: String!, $id: String!) {
        updatePost(data: { title: $title, announcement: $announcement, id: $id, post_img: $post_img }) {
            id
            title
            announcement
            post_img
        }
    }
`

interface Props {
    isOpen: boolean
    idEdit: string
    onClose: () => void
}

const initialState = {
    title: "",
    announcement: ""
}

export const PostEdit: React.FC<Props> = ({ idEdit, isOpen, onClose }) => {
    const { loading, error, data } = useQuery(GET_POST, {
        variables: {
            id: idEdit
        }
    })
    const [UpdatePost, { loading: loadingUpdate }] = useMutation(UPDATE_POST, {
        onCompleted: data => {
            console.log(data)
            onClose()
        }
    })

    const [{ announcement, title }, setState] = useState(initialState)
    const [image, setImage] = useState("")
    const [loadingImage, setLoadingImage] = useState(false)

    useEffect(() => {
        if (data) {
            setState(data.getPostById)
            setImage(data.getPostById.post_img)
        }
    }, [data])

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

    const onCloseModal = () => {
        setImage("")
        setState({ ...initialState })
        onClose()
    }

    const onUpdatePost = () => {
        UpdatePost({
            variables: {
                id: idEdit,
                title,
                announcement,
                post_img: image
            }
        })
    }

    return (
        <Fragment>
            <FormControl>
                <Modal isOpen={isOpen} onClose={onCloseModal} size='xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <HeadContainer>Edit Post</HeadContainer>
                        <ModalCloseButton
                            cursor='pointer'
                            backgroundColor='#be1e2d'
                            borderColor='#be1e2d'
                            borderRadius='50px'
                            color='white'
                        />
                        <ModalBody>
                            {error ? (
                                <BoxQuery>
                                    <p>Something went wrong...</p>
                                </BoxQuery>
                            ) : null}
                            {loading ? (
                                <BoxQuery>
                                    <Spinner />
                                </BoxQuery>
                            ) : null}
                            {data ? (
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
                                            <img
                                                src={image}
                                                alt='post_img'
                                                style={{ width: "100%", height: "200px" }}
                                            />
                                            <FormLabel marginTop='1em' htmlFor='image'>
                                                Upload Image <small>(Max. 2MB)</small>
                                            </FormLabel>
                                            <BoxInput
                                                type='file'
                                                id='image'
                                                placeholder='image'
                                                onChange={onUploadImage}
                                            />
                                        </Fragment>
                                    )}
                                </BoxFormControl>
                            ) : null}
                        </ModalBody>
                        <ModalFooter>
                            <FooterButton
                                variantColor='green'
                                isDisabled={!title || !announcement || !image || loadingUpdate || loading}
                                onClick={onUpdatePost}
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
