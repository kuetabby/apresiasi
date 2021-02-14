/* eslint-disable react/prop-types */
import React, { Fragment } from "react"
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
    Spinner
} from "@chakra-ui/core"
import styled from "@emotion/styled"

import { colors } from "components/utils/variables"
import { ApolloError } from "@apollo/client"

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
interface Props {
    isOpen: boolean
    isLoading: boolean
    isLoadingUpdate: boolean
    onError: ApolloError | undefined
    dataCategory: any
    category: string
    onClose: () => void
    onChangeState: (e: React.ChangeEvent<HTMLSelectElement>) => void
    onUpdateUser: () => void
}

export const CategoryEdit: React.FC<Props> = ({
    isOpen,
    isLoading,
    isLoadingUpdate,
    dataCategory,
    category,
    onError,
    onClose,
    onChangeState,
    onUpdateUser
}) => {
    return (
        <React.Fragment>
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
                                {onError ? (
                                    <BoxQuery>
                                        <p>Something went wrong...</p>
                                    </BoxQuery>
                                ) : null}
                                {isLoading ? (
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
                                isDisabled={!category || isLoadingUpdate}
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
