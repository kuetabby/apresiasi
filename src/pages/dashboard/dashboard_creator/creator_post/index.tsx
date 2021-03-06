/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react"
import { Box, Button } from "@chakra-ui/core"
import styled from "@emotion/styled"

import { colors, mediaQueries } from "components/utils/variables"
import { BoxItem3 as BoxRightEdit, BoxItem6 as BoxRightPost } from "components/utils/flex"

import { Category } from "./category"
import { Settings } from "./settings"
import { Cover } from "./cover"

const BoxFlex = styled(Box)`
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    height: 500px;
    margin-top: 1em;

    ${mediaQueries.mdMax} {
        justify-content: center;
    }
`

const BoxRight = styled(Box)`
    flex: 0 0 auto;
    max-width: 70%;
    flex-basis: 70%;
    padding: 0 0.5em;
    margin: 1em 0;

    ${mediaQueries.lgMax} {
        max-width: 100%;
        flex-basis: 100%;
        padding: 0;
        margin-top: 2em;
    }
`

const BoxWrapper = styled(Box)`
    border: 2px dashed;
    border-radius: 0.4em;
    border-color: ${colors.yellow};
    padding: 10px;
    margin: 20px;
`

const BoxCover = styled(Box)`
    background-color: ${colors.grey};
`

const BoxImage = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 250px;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
`

const ButtonCategory = styled(Button)`
    border: none;
    border-radius: 0.25em;
    margin-top: 1em;
    width: 100%;
    height: 30px;

    cursor: pointer;
`

interface Props {
    data: any
}

const CreatorPostComponent: React.FC<Props> = ({ data }) => {
    return (
        <BoxRight textAlign='center'>
            <BoxCover>
                <BoxImage backgroundImage={`url(${data.cover_img})` || ""}>
                    <Cover data={data} />
                </BoxImage>
                <Box padding='5px'>
                    <Box as='p' marginBottom='0px !important'>
                        Ukuran yang disarankan 900x225.
                    </Box>
                    <Box as='p' marginTop='0px !important'>
                        Cover image digunakan untuk thumbnail pada creator card dan cover page pada perangkat tablet
                        atau desktop.
                    </Box>
                </Box>
            </BoxCover>
            <BoxFlex d='flex'>
                <BoxRightPost>
                    <BoxWrapper d='flex' justifyContent='center' borderColor={colors.green + "!important"}>
                        <Settings data={data} />
                    </BoxWrapper>
                    {/* <BoxWrapper d='flex' borderColor={colors.green + "!important"}>
                        <ButtonTambah>Tambah Post</ButtonTambah>
                    </BoxWrapper> */}
                </BoxRightPost>
                <BoxRightEdit>
                    {/* <BoxWrapper>
                        <Box as='p'>Summary</Box>
                        <SummaryEdit />
                    </BoxWrapper> */}
                    <BoxWrapper>
                        <ButtonCategory>{data.category || ""}</ButtonCategory>
                        <Category data={data} />
                    </BoxWrapper>
                    {/* <BoxWrapper>
                        <Box as='p'>Twitter</Box>
                        <ButtonEdit>Edit Social Link</ButtonEdit>
                    </BoxWrapper> */}
                </BoxRightEdit>
            </BoxFlex>
        </BoxRight>
    )
}

export default CreatorPostComponent
