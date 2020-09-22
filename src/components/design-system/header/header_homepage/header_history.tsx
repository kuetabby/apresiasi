/* eslint-disable react/prop-types */
import * as React from "react"
import styled from "@emotion/styled"
import {
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Button,
    useDisclosure
} from "@chakra-ui/core"
import { faHistory } from "@fortawesome/free-solid-svg-icons"

import { NavIcon } from "./styles"

interface Props {
    openBar: boolean
}

const BoxHead = styled(ModalHeader)`
    text-align: center;
    background: #be1e2d;
    border-color: #be1e2d;
    color: white;
    height: 100%;
`

const BoxBody = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
`

const FooterButton = styled(Button)`
    text-align: center;
    color: white;
    border-color: #0096ff;
    width: 100%;
    cursor: pointer;
`

export const HistoryNav: React.FC<Props> = ({ openBar }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <React.Fragment>
            <NavIcon icon={faHistory} onClick={onOpen} open={openBar} />
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <BoxHead>Riwayat Transaksi</BoxHead>
                    <ModalCloseButton
                        cursor='pointer'
                        backgroundColor='#be1e2d'
                        borderColor='#be1e2d'
                        borderRadius='50px'
                        color='white'
                    />
                    <ModalBody>
                        <BoxBody>Test</BoxBody>
                    </ModalBody>
                    <ModalFooter>
                        <FooterButton variantColor='blue'>Reload</FooterButton>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </React.Fragment>
    )
}
