/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState, useEffect, lazy, Suspense } from "react"
import { gql, useMutation } from "@apollo/client"
import { Button, useToast, useDisclosure, Spinner } from "@chakra-ui/core"
import styled from "@emotion/styled"

import { colors } from "components/utils/variables"

const Edit = lazy(() => import("./edit_goal").then(({ GoalEdit }) => ({ default: GoalEdit })))

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
    mutation UpdateProfile($judul: String!, $description: String!, $target_dana: String!) {
        updateUser(data: { judul: $judul, description: $description, target_dana: $target_dana }) {
            description
            judul
            target_dana
        }
    }
`

interface Props {
    data: any
}

const initialState = {
    judul: "",
    description: "",
    target_dana: ""
}

export const Goal: React.FC<Props> = ({ data }) => {
    const toast = useToast()
    const { isOpen, onClose, onOpen } = useDisclosure()

    const [UpdateUser, { loading }] = useMutation(UPDATE_PROFILE, {
        onError: err => {
            console.log(err.stack)
        },
        onCompleted: () => {
            onClose()
            toast({
                title: "Goal Updated!",
                position: "top",
                description: "Mohon Refresh Page",
                status: "success",
                duration: 3000
            })
        }
    })

    const [{ description, judul, target_dana }, setState] = useState(initialState)

    useEffect(() => {
        if (data) {
            setState(data)
        }
    }, [data])

    const onChangeState = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target

        setState(state => ({ ...state, [id]: value }))
    }

    const onUpdateUser = () => {
        UpdateUser({
            variables: {
                description,
                judul,
                target_dana
            }
        })
    }

    return (
        <React.Fragment>
            {!isOpen && <ButtonEdit onClick={onOpen}>Edit Goal</ButtonEdit>}
            {isOpen && (
                <Suspense fallback={<Spinner />}>
                    <Edit
                        isOpen={isOpen}
                        isLoading={loading}
                        description={description}
                        judul={judul}
                        target_dana={target_dana}
                        onChangeState={onChangeState}
                        onUpdateUser={onUpdateUser}
                        onClose={onClose}
                    />
                </Suspense>
            )}
        </React.Fragment>
    )
}
