/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState, lazy, Suspense } from "react"
import { gql, useMutation } from "@apollo/client"
import { Button, useDisclosure, useToast, Spinner } from "@chakra-ui/core"
import styled from "@emotion/styled"

import { colors } from "components/utils/variables"

const Edit = lazy(() => import("./edit_cover").then(({ CoverEdit }) => ({ default: CoverEdit })))

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
    mutation UpdateProfile($cover_img: String!) {
        updateUser(data: { cover_img: $cover_img }) {
            cover_img
        }
    }
`

interface Props {
    data: any
}

export const Cover: React.FC<Props> = ({ data }) => {
    const toast = useToast()
    const { isOpen, onClose, onOpen } = useDisclosure()

    const [UpdateUser, { loading }] = useMutation(UPDATE_PROFILE, {
        onCompleted: () => {
            onClose()
            toast({
                title: "Cover Updated!",
                position: "top",
                description: "Mohon Refresh Page",
                status: "success",
                duration: 3000
            })
        }
    })

    const [image, setImage] = useState("")
    const [loadingImage, setLoadingImage] = useState(false)

    useEffect(() => {
        if (data) {
            setImage(data.cover_img)
        }
    }, [data])

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
                cover_img: image
            }
        })
    }

    return (
        <React.Fragment>
            {!isOpen && (
                <ButtonEdit onClick={onOpen} notFull>
                    Edit Cover
                </ButtonEdit>
            )}
            {isOpen && (
                <Suspense fallback={<Spinner />}>
                    <Edit
                        isOpen={isOpen}
                        onClose={onClose}
                        isLoadingImage={loadingImage}
                        isLoadingUpdate={loading}
                        onUploadImage={onUploadImage}
                        onUpdateUser={onUpdateUser}
                        image={image}
                    />
                </Suspense>
            )}
        </React.Fragment>
    )
}
