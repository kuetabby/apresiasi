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

const BoxContentImg = styled(Box)`
    width: 90rem;
    height: 18.75rem;
    box-sizing: border-box;

    ${mediaQueries.lg} {
        width: 11.52rem;
        height: 6.3125rem;
        flex-basis: 50%;
        order: 1;
    }
`
const BoxImg = styled(Image)`
    max-width: 90rem;
    max-height: 18.75rem;
    ${mediaQueries.lg} {
        max-height: 31.25rem;
    }
`

export const DescribeComponent: React.FC = () => {
    const token = Cookie.get("token")
    return (
        <WrapperDescribe>
            <BoxContent>
                <BoxContentImg>
                    <BoxImg
                        src='https://trakteer.id/images/mix/bg-3.png'
                        alt='describe-image'
                        width='1024'
                        height='576'
                    />
                </BoxContentImg>
                <BoxSubContent>
                    <Heading as='h2'>Platform digital untuk mendukung content creator</Heading>
                    <BoxSubText>
                        Cara bersahabat bagi content creator untuk mendapat dukungan dana dari para penikmat karyanya
                    </BoxSubText>
                    {token ? (
                        <ButtonLink to={"/manage/dashboard"} backgroundColor={colors.red} variantColor='red'>
                            Dashboard
                        </ButtonLink>
                    ) : (
                        <ButtonLink to={"/login"} backgroundColor={colors.red} variantColor='red'>
                            Buat Halaman
                        </ButtonLink>
                    )}
                </BoxSubContent>
            </BoxContent>
        </WrapperDescribe>
    )
}
