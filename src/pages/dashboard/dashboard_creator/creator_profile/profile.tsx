/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable react/prop-types */
import React, { useState, useEffect, lazy, Suspense } from "react"
import { gql, useMutation } from "@apollo/client"
import { Button, useToast, useDisclosure, Spinner } from "@chakra-ui/core"
import styled from "@emotion/styled"

import { colors } from "components/utils/variables"

const Edit = lazy(() => import("./edit_profile").then(({ ProfileEdit }) => ({ default: ProfileEdit })))

interface ButtonEditProps {
    notFull?: boolean
}

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

export const Profile: React.FC<Props> = ({ data }) => {
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

    const onChangeState = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target

        setState((state: any) => ({ ...state, [id]: value }))
    }

    const onUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        const data = new FormData()

        if (!files) return

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
            {!isOpen && <ButtonEdit onClick={onOpen}>Edit Profile</ButtonEdit>}
            {isOpen && (
                <Suspense fallback={<Spinner />}>
                    <Edit
                        image={image}
                        name={name}
                        username={username}
                        isLoading={loading}
                        isLoadingImage={loadingImage}
                        isOpen={isOpen}
                        onClose={onClose}
                        onChangeState={onChangeState}
                        onUpdateUser={onUpdateUser}
                        onUploadImage={onUploadImage}
                    />
                </Suspense>
            )}
        </React.Fragment>
    )
}
