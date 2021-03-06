import * as React from "react"
import Cookie from "js-cookie"
import { Heading, Box, Image } from "@chakra-ui/core"
import styled from "@emotion/styled"

import { mediaQueries, colors } from "components/utils/variables"
import { WrapperDescribe, ButtonLink } from "./styles"

const BoxContent = styled(Box)`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    flex: 0 1 auto;
    box-sizing: border-box;
    padding: 0px 20px;

    ${mediaQueries.lg} {
        padding: 0px 50px;
        min-height: 600px;
        justify-content: center;
    }
`
const BoxSubContent = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 3em;
    text-align: center;
    box-sizing: border-box;

    ${mediaQueries.lg} {
        text-align: left;
        max-width: 45%;
        flex-basis: 50%;
        order: 0;
    }

    ${mediaQueries.smMax} {
        padding: 0 0.5em 0 0.5em;
    }
`
const BoxSubText = styled(Box)`
    font-size: 1.25em;

    ${mediaQueries.smMax} {
        padding: 0 0.5em 0 0.5em;
    }
`
const BoxImg = styled(Image)`
    width: 100%;
    height: 18.75rem;
    box-sizing: border-box;

    ${mediaQueries.lg} {
        height: 31.25rem;
        flex-basis: 50%;
        order: 1;
    }
`

export const DescribeComponent: React.FC = () => {
    const token = Cookie.get("token")
    return (
        <WrapperDescribe>
            <BoxContent>
                <BoxImg
                    src='https://trakteer.id/images/mix/bg-3.png'
                    alt='describe-image'
                    width='1024'
                    height='576'
                    objectFit='contain'
                />
                <BoxSubContent>
                    <Heading as='h2'>Platform digital untuk mendukung content creator</Heading>
                    <BoxSubText>
                        Cara bersahabat bagi content creator untuk mendapat dukungan dana dari para penikmat karyanya
                    </BoxSubText>
                    {token && (
                        <ButtonLink to={"/manage/dashboard"} backgroundColor={colors.red} variantColor='red'>
                            Dashboard
                        </ButtonLink>
                    )}
                    {!token && (
                        <ButtonLink to={"/login"} backgroundColor={colors.red} variantColor='red'>
                            Buat Halaman
                        </ButtonLink>
                    )}
                </BoxSubContent>
            </BoxContent>
        </WrapperDescribe>
    )
}
