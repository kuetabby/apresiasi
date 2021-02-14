/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { gql, useMutation } from "@apollo/client"
import {
    Button,
    Box,
    Input,
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
    Textarea
} from "@chakra-ui/core"
import styled from "@emotion/styled"

import { colors } from "components/utils/variables"
import { BoxFlex } from "components/utils/flex"

const HeadContainer = styled(ModalHeader)`
    text-align: center;
    background: #be1e2d;
    border-color: #be1e2d;
    color: white;
    height: 100%;
`

const BodyContainer = BoxFlex

const FooterButton = styled(Button)`
    text-align: center;
    color: white;
    border-color: #0096ff;
    width: 100%;
    cursor: pointer;
`

const BoxInput = styled(Input)`
    border-color: ${colors.darkGrey};
    width: 100%;
    margin-bottom: 1.5em;
`

// const BoxSelect = styled(Select)`
//     width: 100%;
//     margin-bottom: 1.5em;
// `

const BoxLabel = styled(FormLabel)`
    text-align: left;
    width: 30%;
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

const CREATE_TRANSACTION = gql`
    mutation CreateTransaction(
        $email: String!
        $customer_name: String!
        $pesan_dukungan: String!
        $phone_number: String!
        $payment_method: String!
        $payment_amount: String!
        $recipient_id: String!
    ) {
        createTransaction(
            data: {
                email: $email
                customer_name: $customer_name
                pesan_dukungan: $pesan_dukungan
                phone_number: $phone_number
                payment_amount: $payment_amount
                payment_method: $payment_method
                recipient_id: $recipient_id
            }
        ) {
            url_pembayaran
            status
        }
    }
`

interface Props {
    onClose: () => void
    data: any
    isOpen: boolean
}

const initialState = {
    nominal: "",
    pesan: "",
    nama: "",
    phone: "",
    email: ""
}

export const TipComponent: React.FC<Props> = ({ onClose, isOpen, data }) => {
    const { id } = useParams()
    const [{ nominal, pesan, nama, phone, email }, setState] = useState(initialState)
    const [isDisabled, setDisabled] = useState(false)
    const [payment_method, setPaymentMethod] = useState("")

    const [CreateTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
        onCompleted: data => {
            // console.log(data.createTransaction.url_pembayaran, "pembayaran")
            window.open(data.createTransaction.url_pembayaran)
            setState({ ...initialState })
            setPaymentMethod("")
            onClose()
        }
    })

    useEffect(() => {
        if (!nominal) {
            return setDisabled(true)
        }
        if (!pesan) {
            return setDisabled(true)
        }
        if (!nama) {
            return setDisabled(true)
        }
        if (!phone) {
            return setDisabled(true)
        }
        if (!email) {
            return setDisabled(true)
        }
        if (!payment_method) {
            return setDisabled(true)
        }
        return setDisabled(false)
    }, [email, nama, nominal, payment_method, pesan, phone])

    const onChangeState = (e: any) => {
        const { id, value } = e.target

        setState(state => ({ ...state, [id]: value }))
    }

    const onChangePayment = (e: any) => {
        const { value } = e.target
        setPaymentMethod(value)
    }

    const onCreateTransaction = () => {
        CreateTransaction({
            variables: {
                email,
                customer_name: nama,
                pesan_dukungan: pesan,
                phone_number: phone,
                payment_amount: nominal,
                recipient_id: id,
                payment_method
            }
        })
    }

    return (
        <React.Fragment>
            <FormControl>
                <Modal isOpen={isOpen} onClose={onClose} size='xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <HeadContainer>Apresiasi {data && data.getUserById.name}</HeadContainer>
                        <ModalCloseButton
                            cursor='pointer'
                            backgroundColor='#be1e2d'
                            borderColor='#be1e2d'
                            borderRadius='50px'
                            color='white'
                        />
                        <ModalBody>
                            <BodyContainer backgroundColor={colors.grey}>
                                <BoxFlex margin='10px' justifyContent='space-between'>
                                    <BoxLabel htmlFor='nama'>Nama</BoxLabel>
                                    <Box d='flex' justifyContent='space-between' width='100%'>
                                        <BoxInput id='nama' value={nama} onChange={onChangeState} placeholder='nama' />
                                    </Box>
                                </BoxFlex>
                                <BoxFlex margin='10px' justifyContent='space-between'>
                                    <BoxLabel htmlFor='phone'>No Telepon</BoxLabel>
                                    <Box d='flex' justifyContent='space-between' width='100%'>
                                        <BoxInput
                                            id='phone'
                                            value={phone}
                                            onChange={onChangeState}
                                            placeholder='phone'
                                        />
                                    </Box>
                                </BoxFlex>
                                <BoxFlex margin='10px' justifyContent='space-between'>
                                    <BoxLabel htmlFor='email'>Email</BoxLabel>
                                    <Box d='flex' justifyContent='space-between' width='100%'>
                                        <BoxInput
                                            id='email'
                                            value={email}
                                            onChange={onChangeState}
                                            placeholder='email'
                                        />
                                    </Box>
                                </BoxFlex>
                                <BoxFlex margin='10px' justifyContent='space-between'>
                                    <BoxLabel htmlFor='nominal'>Nominal</BoxLabel>
                                    <Box d='flex' justifyContent='space-between' width='100%'>
                                        <BoxAt>Rp</BoxAt>
                                        <BoxInput
                                            id='nominal'
                                            value={nominal}
                                            onChange={onChangeState}
                                            placeholder='nominal'
                                        />
                                    </Box>
                                </BoxFlex>
                                <BoxFlex margin='10px' justifyContent='space-between'>
                                    <BoxLabel htmlFor='pesan'>Pesan Dukungan</BoxLabel>
                                    <Textarea
                                        id='pesan'
                                        value={pesan}
                                        onChange={onChangeState}
                                        borderColor='#d2c7c7'
                                        resize='vertical'
                                        placeholder='Pesan Dukungan'
                                    />
                                </BoxFlex>
                                {/* <BoxFlex margin='10px' justifyContent='space-between'>
                                    <BoxLabel htmlFor='dana'>Target Dana</BoxLabel>
                                    <Box d='flex' justifyContent='space-between' width='100%'>
                                        <BoxAt>Rp</BoxAt>
                                        <BoxInput id='dana' placeholder='dana' />
                                    </Box>
                                </BoxFlex> */}
                                <BoxFlex margin='10px' justifyContent='space-between'>
                                    <BoxLabel htmlFor='pengaturan' width='100% !important'>
                                        Pilih Metode Pembayaran
                                    </BoxLabel>
                                    <Select
                                        onChange={onChangePayment}
                                        placeholder='Pilih Metode Pembayaran'
                                        value={payment_method}
                                    >
                                        <option value='BK'>BCA KlikPay (Biaya Transaksi Rp.6000) </option>
                                        <option value='M1'>Mandiri Virtual Account (Biaya Transaksi Rp.4000)</option>
                                        <option value='BT'>Permata Bank Virtual Account (Tanpa Biaya Transaksi)</option>
                                        <option value='A1'>ATM Bersama (Tanpa Biaya Transaksi) </option>
                                        <option value='I1'>BNI Virtual Account (Biaya Transaski Rp.3000) </option>
                                    </Select>
                                </BoxFlex>
                            </BodyContainer>
                        </ModalBody>
                        <ModalFooter>
                            <FooterButton
                                variantColor='blue'
                                onClick={onCreateTransaction}
                                isDisabled={isDisabled || loading}
                            >
                                Lanjutkan
                            </FooterButton>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </FormControl>
        </React.Fragment>
    )
}
