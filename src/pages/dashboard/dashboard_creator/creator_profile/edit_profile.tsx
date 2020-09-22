/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, Fragment } from "react"
import { gql, useMutation } from "@apollo/client"
import {
    Avatar,
    Button,
    Box,
    Input,
    FormControl,
    FormLabel,
    Modal,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Spinner,
    useToast,
    useDisclosure
} from "@chakra-ui/core"
import styled from "@emotion/styled"

import { colors } from "components/utils/variables"

interface ButtonEditProps {
    notFull?: boolean
}

const HeadContainer = styled(ModalHeader)`
    text-align: center;
    background: #be1e2d;
    border-color: #be1e2d;
    color: white;
    height: 100%;
`

const BodyContainer = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background-color: ${colors.grey};
`

const FooterButton = styled(Button)`
    text-align: center;
    color: white;
    border-color: #0096ff;
    width: 100%;
    cursor: pointer;
`

const BoxInput = styled(Input)`
    border-color: ${colors.darkGrey};
    width: 100%;
    margin-bottom: 1.5em;
`

const ButtonEdit = styled(Button)<ButtonEditProps>`
    width:  ${props => (props.notFull ? "auto" : "100%;")}
    height: 30px;
    background-color: ${colors.yellow};
    border: none;
    border-radius: 30px;
    color: ${colors.white};
    margin: 1em auto;
    cursor: pointer;

    &:hover {
        background-color: orange;
    }
`

const BoxFlex = styled(Box)`
    display: flex;
    align-items: center;
    margin: 10px;
    justify-content: space-between;
    width: 100%;
`

const BoxLabel = styled(FormLabel)`
    text-align: left;
    width: 30%;
`

const BoxImg = styled(Box)`
    display: flex;
    align-items: center;
    flex-basis: auto;
    padding: 1px 0.5em;
    background: ${colors.white};
    border: 1px solid;
    border-radius: 0.25em;
    border-color: ${colors.grey};
    height: 2.5rem;
    margin-right: 1em;
`

const BoxAt = styled(Box)`
    display: flex;
    align-items: center;
    flex-basis: auto;
    border: 1px solid;
    border-radius: 0.25em;
    border-color: ${colors.grey};
    padding: 1px 0.5em;
    height: 2.5rem;
    background-color: ${colors.darkGrey};
`

const UPDATE_PROFILE = gql`
    mutation UpdateProfile($name: String!, $username: String!, $profile_img: String!) {
        updateUser(data: { name: $name, username: $username, profile_img: $profile_img }) {
            name
            username
            profile_img
        }
    }
`

interface Props {
    data: any
}

const initialState = {
    name: "",
    username: ""
}

export const ProfileEdit: React.FC<Props> = ({ data }) => {
    const toast = useToast()
    const { isOpen, onClose, onOpen } = useDisclosure()

    const [UpdateUser, { loading }] = useMutation(UPDATE_PROFILE, {
        onCompleted: () => {
            onClose()
            toast({
                title: "Profile Updated!",
                position: "top",
                description: "Mohon Refresh Page",
                status: "success",
                duration: 3000
            })
        }
    })
    const [{ username, name }, setState] = useState(initialState)
    const [image, setImage] = useState("")
    const [loadingImage, setLoadingImage] = useState(false)

    useEffect(() => {
        if (data) {
            setState(data)
            setImage(data.profile_img)
        }
    }, [data])

    const onChangeState = (e: any) => {
        const { id, value } = e.target

        setState((state: any) => ({ ...state, [id]: value }))
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

    const onUpdateUser = () => {
        UpdateUser({
            variables: {
                name,
                username,
                profile_img: image
            }
        })
    }

    return (
        <React.Fragment>
            <ButtonEdit onClick={onOpen}>Edit Profile</ButtonEdit>
            <FormControl>
                <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <HeadContainer>Edit Profile</HeadContainer>
                        <ModalCloseButton
                            cursor='pointer'
                            backgroundColor='#be1e2d'
                            borderColor='#be1e2d'
                            borderRadius='50px'
                            color='white'
                        />
                        <ModalBody>
                            <BodyContainer>
                                <BoxFlex>
                                    <BoxLabel htmlFor='avatar'>Avatar</BoxLabel>
                                    <Box as='div' d='flex' justifyContent='space-between' width='100%'>
                                        {loadingImage ? (
                                            <Spinner />
                                        ) : (
                                            <Fragment>
                                                <BoxImg>
                                                    <Avatar width='40px' height='40px' name={name} src={image} />
                                                </BoxImg>
                                                <BoxInput
                                                    type='file'
                                                    id='avatar'
                                                    onChange={onUploadImage}
                                                    placeholder='avatar'
                                                />
                                            </Fragment>
                                        )}
                                    </Box>
                                </BoxFlex>
                                <BoxFlex>
                                    <BoxLabel htmlFor='name'>Name</BoxLabel>
                                    <BoxInput
                                        id='name'
                                        value={name || ""}
                                        onChange={onChangeState}
                                        placeholder='name'
                                    />
                                </BoxFlex>
                                <BoxFlex>
                                    <BoxLabel htmlFor='username'>Username</BoxLabel>
                                    <Box d='flex' justifyContent='space-between' width='100%'>
                                        <BoxAt>@</BoxAt>
                                        <BoxInput
                                            id='username'
                                            value={username || ""}
                                            onChange={onChangeState}
                                            placeholder='username'
                                        />
                                    </Box>
                                </BoxFlex>
                                {/* <BoxFlex>
                                    <BoxLabel htmlFor='occupation'>Occupation</BoxLabel>
                                    <BoxInput id='occupation' placeholder='occupation' />
                                </BoxFlex> */}
                            </BodyContainer>
                        </ModalBody>
                        <ModalFooter>
                            <FooterButton variantColor='blue' onClick={onUpdateUser} isDisabled={loading}>
                                Simpan
                            </FooterButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </FormControl>
        </React.Fragment>
    )
}
