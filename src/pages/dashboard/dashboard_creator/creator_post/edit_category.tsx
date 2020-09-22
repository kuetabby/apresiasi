/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect } from "react"
import { gql, useQuery, useMutation } from "@apollo/client"
import {
    Button,
    Box,
    FormControl,
    FormLabel,
    Modal,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Select,
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
    justify-content: space-between;
    margin: 10px;
    width: 100%;
`

const BoxQuery = styled(Box)`
    width: 100%;
    height: 500px;
    text-align: center;
    margin-top: 1.5em;
`

const BoxLabel = styled(FormLabel)`
    text-align: left;
    width: 30%;
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

export const CategoryEdit: React.FC<Props> = ({ data }) => {
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
            <ButtonEdit onClick={onOpen}>Edit Category</ButtonEdit>
            <FormControl>
                <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <HeadContainer>Edit Category</HeadContainer>
                        <ModalCloseButton
                            cursor='pointer'
                            backgroundColor='#be1e2d'
                            borderColor='#be1e2d'
                            borderRadius='50px'
                            color='white'
                        />
                        <ModalBody>
                            <BodyContainer>
                                {error ? (
                                    <BoxQuery>
                                        <p>Something went wrong...</p>
                                    </BoxQuery>
                                ) : null}
                                {loading ? (
                                    <BoxQuery>
                                        <Spinner />
                                    </BoxQuery>
                                ) : (
                                    <BoxFlex>
                                        <BoxLabel htmlFor='category'>Category</BoxLabel>
                                        <Select
                                            placeholder='Select Category'
                                            value={category || ""}
                                            onChange={onChangeState}
                                            borderColor='#d2c7c7'
                                        >
                                            {dataCategory &&
                                                dataCategory.getAllCategory.map((item: any, i: number) => (
                                                    <Fragment key={i}>
                                                        <option value={item.category}>{item.category}</option>
                                                    </Fragment>
                                                ))}
                                        </Select>
                                    </BoxFlex>
                                )}
                            </BodyContainer>
                        </ModalBody>
                        <ModalFooter>
                            <FooterButton
                                variantColor='blue'
                                onClick={onUpdateUser}
                                isDisabled={!category || loadingUpdate}
                            >
                                Simpan
                            </FooterButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </FormControl>
        </React.Fragment>
    )
}
