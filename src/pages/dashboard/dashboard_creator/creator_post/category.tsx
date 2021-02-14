/* eslint-disable react/prop-types */
import React, { useState, useEffect, lazy, Suspense } from "react"
import { gql, useQuery, useMutation } from "@apollo/client"
import { Button, useToast, useDisclosure, Spinner } from "@chakra-ui/core"
import styled from "@emotion/styled"

import { colors } from "components/utils/variables"

const Edit = lazy(() => import("./edit_category").then(({ CategoryEdit }) => ({ default: CategoryEdit })))

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

const GET_CATEGORY = gql`
    {
        getAllCategory {
            id
            category
        }
    }
`

const UPDATE_PROFILE = gql`
    mutation UpdateProfile($category: String!) {
        updateUser(data: { category: $category }) {
            category
        }
    }
`

interface Props {
    data: any
}

export const Category: React.FC<Props> = ({ data }) => {
    const toast = useToast()
    const { isOpen, onClose, onOpen } = useDisclosure()

    const { loading, error, data: dataCategory } = useQuery(GET_CATEGORY)
    const [UpdateProfile, { loading: loadingUpdate }] = useMutation(UPDATE_PROFILE, {
        onError: err => {
            console.log(err.stack)
        },
        onCompleted: () => {
            onClose()
            toast({
                title: "Category Updated!",
                position: "top",
                description: "Mohon Refresh Page",
                status: "success",
                duration: 3000
            })
        }
    })

    const [category, setState] = useState("")

    useEffect(() => {
        if (data) {
            setState(data.category)
        }
    }, [data])

    const onChangeState = (e: any) => {
        const { value } = e.target

        setState(value)
    }

    const onUpdateUser = () => {
        UpdateProfile({
            variables: {
                category
            }
        })
    }

    return (
        <React.Fragment>
            {!isOpen && <ButtonEdit onClick={onOpen}>Edit Category</ButtonEdit>}
            {isOpen && (
                <Suspense fallback={<Spinner marginTop='5px' />}>
                    <Edit
                        isOpen={isOpen}
                        isLoading={loading}
                        isLoadingUpdate={loadingUpdate}
                        onError={error}
                        category={category}
                        dataCategory={dataCategory}
                        onChangeState={onChangeState}
                        onClose={onClose}
                        onUpdateUser={onUpdateUser}
                    />
                </Suspense>
            )}
        </React.Fragment>
    )
}
