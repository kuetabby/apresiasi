/* eslint-disable react/prop-types */
import React, { Fragment } from "react"
import { Box, Avatar, Button, useDisclosure, Spinner } from "@chakra-ui/core"
import styled from "@emotion/styled"

import { colors, mediaQueries } from "components/utils/variables"
import { BoxItem2 as BoxLeft } from "components/utils/flex"

import { TipComponent } from "./profile_tip"

const BoxWrapper = styled(Box)`
    padding: 10px;
    margin: 20px;
    height: 100%;
`

const BoxQuery = styled(Box)`
    width: 100%;
    height: 100px;
    text-align: center;
    margin-top: 1.5em;
`

const BoxImage = styled(Box)`
    position: relative;
    margin-bottom: 1.5em;
    ${mediaQueries.lgMax} {
        height: 250px;
        width: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
        background-image: url(https://media.matamata.com/thumbs/2019/09/19/90661-jennie-blackpink-instagramatjennierubyjane/745x489-img-90661-jennie-blackpink-instagramatjennierubyjane.jpg);
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;

        div {
            margin-top: 1.5em;
        }
    }
`

const ButtonApresiasi = styled(Button)`
    width: 100%;
    height: 30px;
    border: none;
    border-radius: 30px;
    color: ${colors.white};
    margin: 1em auto;
    cursor: pointer;
`

interface Props {
    data: any
    onLoading: boolean
    onError: any
}

const ApresiasiProfileComponent: React.FC<Props> = ({ data, onLoading, onError }) => {
    const { isOpen, onClose, onOpen } = useDisclosure()

    return (
        <BoxLeft margin='1em 0' textAlign='center' backgroundColor={colors.grey}>
            {onError ? (
                <BoxQuery>
                    <p>Something went wrong...</p>
                </BoxQuery>
            ) : null}

            {onLoading ? (
                <BoxQuery>
                    <Spinner />
                </BoxQuery>
            ) : (
                <Fragment>
                    <BoxWrapper>
                        <BoxImage>
                            <Avatar name={data.getUserById.name} size='2xl' src={data.getUserById.profile_img} />
                        </BoxImage>
                        <Box as='h2' marginBottom='0px !important'>
                            {data.getUserById.name}
                        </Box>
                        <Box as='p' marginTop='0px !important'>
                            {data.getUserById.username}
                        </Box>
                    </BoxWrapper>
                    <BoxWrapper backgroundColor={colors.white}>
                        <Box as='p'>{data.getUserById.judul}</Box>
                        <Box as='p' marginBottom='5px !important'>
                            Rp {Number(data.getUserById.balance).toLocaleString() || 0} terkumpul dari Rp{" "}
                            {Number(data.getUserById.target_dana).toLocaleString()}
                        </Box>
                        {/* <Progress color='red' hasStripe />
                        <Box as='p' marginTop='5px !important'>
                            0.00% tercapai
                        </Box> */}
                        <ButtonApresiasi
                            backgroundColor={colors.red}
                            _hover={{
                                backgroundColor: "red.500"
                            }}
                            onClick={onOpen}
                            isDisabled={data.getUserById.is_page_active !== "active"}
                        >
                            Kirim Dukungan
                        </ButtonApresiasi>
                    </BoxWrapper>
                    <BoxWrapper backgroundColor={colors.white}>
                        <Box as='p'>{data.getUserById.description}</Box>
                    </BoxWrapper>
                </Fragment>
            )}
            {isOpen ? <TipComponent onClose={onClose} data={data} isOpen={isOpen} /> : null}
        </BoxLeft>
    )
}

export default ApresiasiProfileComponent
