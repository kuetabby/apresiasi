/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, lazy, Suspense } from "react"
import { gql, useMutation } from "@apollo/client"
import { Button, useDisclosure, useToast, Spinner } from "@chakra-ui/core"
import styled from "@emotion/styled"

import { colors } from "components/utils/variables"

const Edit = lazy(() => import("./edit_settings").then(({ SettingsEdit }) => ({ default: SettingsEdit })))

interface ButtonEditProps {
    notFull?: boolean
}

const ButtonEdit = styled(Button)<ButtonEditProps>`
    background-color: ${colors.green};
    border: none;
    border-radius: 0.25em;
    width: 45%;
    color: ${colors.white};
    margin: 1em auto;
    cursor: pointer;
    font-size: 0.9em;

    &:hover {
        background-color: ${colors.darkGreen};
    }
`

const UPDATE_PROFILE = gql`
    mutation UpdateProfile($is_page_active: String!) {
        updateUser(data: { is_page_active: $is_page_active }) {
            is_page_active
        }
    }
`

interface Props {
    data: any
}

export const Settings: React.FC<Props> = ({ data }) => {
    const toast = useToast()
    const { isOpen, onClose, onOpen } = useDisclosure()

    const [UpdateUser, { loading }] = useMutation(UPDATE_PROFILE, {
        onError: err => {
            console.log(err.stack)
        },
        onCompleted: () => {
            onClose()
            toast({
                title: "Page Updated!",
                position: "top",
                description: "Mohon Refresh Page",
                status: "success",
                duration: 3000
            })
        }
    })

    const [page_active, setState] = useState("")

    useEffect(() => {
        if (data) {
            setState(data.is_page_active)
        }
    }, [data])

    const onChangeState = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target

        setState(value)
    }

    const onUpdateUser = () => {
        UpdateUser({
            variables: {
                is_page_active: page_active
            }
        })
    }

    return (
        <React.Fragment>
            {!isOpen && <ButtonEdit onClick={onOpen}>Page Settings</ButtonEdit>}
            {isOpen && (
                <Suspense fallback={<Spinner />}>
                    <Edit
                        isOpen={isOpen}
                        onClose={onClose}
                        onUpdateUser={onUpdateUser}
                        isLoadingUpdate={loading}
                        onChangeState={onChangeState}
                        page_active={page_active}
                    />
                </Suspense>
            )}
        </React.Fragment>
    )
}
