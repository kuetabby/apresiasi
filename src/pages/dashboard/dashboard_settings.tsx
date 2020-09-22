/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect, Fragment } from "react"
import { Box, Heading, Input, Avatar, Button, FormControl, FormLabel, Select, Spinner, useToast } from "@chakra-ui/core"
import styled from "@emotion/styled"
import { gql, useQuery, useMutation } from "@apollo/client"

import { colors, mediaQueries } from "components/utils/variables"
import { Root, BoxWrapper } from "./styles"
import { BoxItem2 as BoxAvatar } from "components/utils/flex"

const BoxFormControl = styled(FormControl)`
    flex-wrap: wrap;
    flex: 0 1 auto;
    width: 100%;
    height: 500px;
    justify-content: space-between;
    margin-top: 1.5em;
`

const BoxQuery = styled(Box)`
    width: 100%;
    height: 500px;
    text-align: center;
    margin-top: 1.5em;
`

const BoxForm = styled(Box)`
    flex: 0 0 auto;
    max-width: 70%;
    flex-basis: 70%;
    padding: 0 0.5em;

    ${mediaQueries.lgMax} {
        max-width: 100%;
        flex-basis: 100%;
        padding: 0;
        margin-top: 2em;
    }
`

const BoxInput = styled(Input)`
    border-color: ${colors.darkGrey};
    margin-bottom: 1.5em;
`

const BoxSelect = styled(Select)`
    border-color: ${colors.darkGrey};
    margin-bottom: 1.5em;
`

const ButtonSave = styled(Button)`
    border-radius: 0.25em;
    cursor: pointer;
    background-color: ${colors.green};
    border: none;
    float: right;
    color: ${colors.white};

    &:hover {
        background-color: ${colors.darkGreen};
    }
`

const GET_PROFILE = gql`
    {
        getUser {
            name
            gender
            address
            phone
            profile_img
        }
    }
`

const UPDATE_PROFILE = gql`
    mutation UpdateProfile(
        $name: String!
        $phone: String!
        $address: String!
        $gender: String!
        $profile_img: String!
    ) {
        updateUser(
            data: { name: $name, phone: $phone, address: $address, profile_img: $profile_img, gender: $gender }
        ) {
            name
            phone
            address
            profile_img
            gender
        }
    }
`

const initialState = {
    name: "",
    phone: "",
    address: ""
}

const SettingsPage: React.FC = () => {
    const toast = useToast()

    const { loading, error, data } = useQuery(GET_PROFILE)
    const [UpdateUser, { loading: loading_update }] = useMutation(UPDATE_PROFILE, {
        onCompleted: () => {
            toast({
                title: "Profile Updated!",
                position: "top",
                description: "Mohon Refresh Page",
                status: "success",
                duration: 3000
            })
        }
    })

    const [{ name, phone, address }, setState] = useState(initialState)
    const [gender, setGender] = useState("")
    const [image, setImage] = useState("")
    const [loadingImage, setLoadingImage] = useState(false)

    useEffect(() => {
        if (data) {
            setState(data.getUser)
            setImage(data.getUser.profile_img)
            setGender(data.getUser.gender)
        }
    }, [data])

    const onChangeState = (e: any) => {
        const { id, value } = e.target

        setState(state => ({ ...state, [id]: value }))
    }

    const onChangeGender = (e: any) => {
        const { value } = e.target

        setGender(value)
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
                phone,
                address,
                gender,
                profile_img: image
            }
        })
    }

    return (
        <Root>
            <BoxWrapper as='div'>
                <Heading as='h1' size='md' color={colors.red}>
                    Account Settings
                </Heading>
                {error ? (
                    <BoxQuery>
                        <p>Something went wrong...</p>
                    </BoxQuery>
                ) : null}
                {loading ? (
                    <BoxQuery>
                        <Spinner />
                    </BoxQuery>
                ) : data ? (
                    <BoxFormControl d='flex'>
                        <BoxAvatar textAlign='center'>
                            {loadingImage ? (
                                <BoxQuery>
                                    <Spinner />
                                </BoxQuery>
                            ) : (
                                <Fragment>
                                    <Avatar name={name} width='200px' height='200px' src={image} />
                                    <Box as='div' marginTop='1em' color={colors.red}>
                                        <FormLabel htmlFor='file' textDecoration='underline' cursor='pointer'>
                                            Upload Image
                                        </FormLabel>
                                        <BoxInput type='file' id='file' display='none' onChange={onUploadImage} />
                                    </Box>
                                </Fragment>
                            )}
                        </BoxAvatar>
                        <BoxForm>
                            <FormLabel htmlFor='name'>Name</FormLabel>
                            <BoxInput id='name' placeholder='name' value={name || ""} onChange={onChangeState} />
                            <FormLabel htmlFor='gender'>Gender</FormLabel>
                            <BoxSelect onChange={onChangeGender} placeholder='Select Gender' value={gender || ""}>
                                <option value='Laki-laki'>Laki-laki</option>
                                <option value='Perempuan'>Perempuan</option>
                            </BoxSelect>
                            <FormLabel htmlFor='phone'>Phone Number</FormLabel>
                            <BoxInput id='phone' placeholder='phone' value={phone || ""} onChange={onChangeState} />
                            <FormLabel htmlFor='address'>Address</FormLabel>
                            <BoxInput
                                id='address'
                                placeholder='address'
                                value={address || ""}
                                onChange={onChangeState}
                            />
                            <ButtonSave onClick={onUpdateUser} isDisabled={loading_update}>
                                Simpan
                            </ButtonSave>
                        </BoxForm>
                    </BoxFormControl>
                ) : null}
            </BoxWrapper>
        </Root>
    )
}

export default SettingsPage
