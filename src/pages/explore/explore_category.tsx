import React from "react"
import styled from "@emotion/styled"
import { gql, useQuery } from "@apollo/client"
import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Spinner
} from "@chakra-ui/core"
import { colors } from "components/utils/variables"

const HeadContainer = styled(ModalHeader)`
    text-align: center;
    background: #be1e2d;
    border-color: #be1e2d;
    color: white;
    height: 100%;
`

const BoxQuery = styled(Box)`
    width: 100%;
    height: 500px;
    text-align: center;
    margin-top: 1.5em;
`

const GET_CATEGORY = gql`
    {
        getAllCategory {
            id
            category
        }
    }
`

interface Props {
    isOpen: boolean
    onClose: () => void
}

export const CategoryComponent: React.FC<Props> = ({ isOpen, onClose }) => {
    const { loading, error, data } = useQuery(GET_CATEGORY)

    return (
        <React.Fragment>
            <Modal isOpen={isOpen} size='xl' onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <HeadContainer>Pencarian</HeadContainer>
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
                        <Box d='flex' alignItems='center' justifyContent='space-around' flexWrap='wrap'>
                            {loading ? (
                                <BoxQuery>
                                    <Spinner />
                                </BoxQuery>
                            ) : data ? (
                                data.getAllCategory.map((item: any, i: number) => (
                                    <Box
                                        key={i}
                                        as='div'
                                        rounded='md'
                                        textAlign='center'
                                        bg={colors.grey}
                                        color='black'
                                        w='30%'
                                        h={30}
                                        m='5px'
                                        cursor='pointer'
                                    >
                                        {item.category}
                                    </Box>
                                ))
                            ) : null}
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </React.Fragment>
    )
}
