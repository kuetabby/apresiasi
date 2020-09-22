/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { Fragment, useState } from "react"
import {
    Heading,
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
    Input,
    Button,
    useDisclosure
} from "@chakra-ui/core"
import styled from "@emotion/styled"

import { colors, mediaQueries, shadows } from "components/utils/variables"
import { BoxItem2 } from "components/utils/flex"

// import { TableComponent } from "components/design-system/table"

const BoxFormControl = styled(FormControl)`
    flex-wrap: wrap;
    flex: 0 1 auto;
    width: 100%;
    justify-content: space-between;
    margin-top: 1.5em;
`

const BoxForm = styled(Box)`
    flex: 0 0 auto;
    max-width: 100%;
    flex-basis: 100%;
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
    margin-bottom: 0.5em;
    box-shadow: ${shadows.single};
    width: 100%;
`

const BoxContent = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-items: center;
    height: 200px;
    margin-top: 1em;
    background-color: #ebf8ff;
`

const BoxAt = styled(Box)`
    display: flex;
    align-items: center;
    flex-basis: auto;
    border: 1px solid;
    border-radius: 0.25em;
    border-color: ${colors.grey};
    padding: 1px 0.5em;
    height: 2.5rem;
    background-color: ${colors.darkGrey};
`

interface ButtonProps {
    hoverBackground?: string
}
const ButtonBalance = styled(Button)<ButtonProps>`
    border-radius: 0.25em;
    border: 1px solid;
    cursor: pointer;
    padding: 7px 20px;
    background-color: ${colors.white};

    &:hover {
        background-color: ${props => props.hoverBackground};
        color: ${colors.white};
        border: none;
    }
`

const HeadContainer = styled(ModalHeader)`
    text-align: center;
    background: #be1e2d;
    border-color: #be1e2d;
    color: white;
    height: 100%;
`

const FooterButton = styled(Button)`
    border-radius: 0.25em;
    cursor: pointer;
    background-color: ${colors.green};
    border: none;
    float: right;
    color: ${colors.white};
    box-shadow: none !important;
    width: 100%;

    &:hover {
        background-color: ${colors.darkGreen};
    }
`

export const BalanceWithdrawal = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()

    const [dana, setDana] = useState("")

    const onChangeState = (e: any) => setDana(e.target.value)

    return (
        <Fragment>
            <ButtonBalance
                float='right'
                borderColor={colors.red}
                boxShadow={shadows.singleRed}
                color={colors.red}
                hoverBackground={colors.red}
                onClick={onOpen}
            >
                Withdrawal
            </ButtonBalance>
            <FormControl>
                <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <HeadContainer>Pencairan Dana</HeadContainer>
                        <ModalCloseButton
                            cursor='pointer'
                            backgroundColor='#be1e2d'
                            borderColor='#be1e2d'
                            borderRadius='50px'
                            color='white'
                        />
                        <ModalBody>
                            <BoxContent as='div'>
                                <Heading as='h3' marginBottom='0'>
                                    Saldo: Rp 0
                                </Heading>
                                <Box as='p' color={colors.red}>
                                    Akun bank kamu tidak lengkap atau belum divalidasi. Silahkan lengkapi data terlebih
                                    dahulu dan menunggu proses validasi.
                                </Box>
                            </BoxContent>
                            <BoxFormControl>
                                <BoxForm>
                                    <FormLabel htmlFor='dana' marginBottom='0.5em'>
                                        Jumlah Pencairan Dana
                                        <br />
                                        <small style={{ color: colors.red }}>Lihat batas nominal withdrawal</small>
                                    </FormLabel>
                                    <Box d='flex' justifyContent='space-between' width='100%'>
                                        <BoxAt>Rp</BoxAt>
                                        <BoxInput
                                            id='dana'
                                            value={dana}
                                            onChange={onChangeState}
                                            placeholder='Nominal Pencairan Dana'
                                        />
                                    </Box>
                                    <Box d='flex' flexWrap='wrap'>
                                        <BoxItem2 as='div'>Service Fee (5%): Rp 0</BoxItem2>
                                        <BoxItem2 as='div' color={colors.red}>
                                            Diterima: Rp 0
                                        </BoxItem2>
                                    </Box>
                                </BoxForm>
                            </BoxFormControl>
                        </ModalBody>
                        <ModalFooter>
                            <FooterButton variantColor='green'>Cairkan</FooterButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </FormControl>
        </Fragment>
    )
}
