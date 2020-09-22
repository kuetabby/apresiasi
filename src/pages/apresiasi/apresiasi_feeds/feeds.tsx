import React from "react"
import { Button, Box, Input, Textarea, FormControl } from "@chakra-ui/core"
import styled from "@emotion/styled"

import { colors, mediaQueries } from "components/utils/variables"

const BodyContainer = styled(Box)`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background-color: ${colors.grey};
    border: none;
    border-radius: 0.25em;
    padding: 10px;

    ${mediaQueries.mdMax} {
        padding: 0;
    }
`

const FooterButton = styled(Button)`
    text-align: center;
    color: white;
    border: none;
    width: 100%;
    cursor: pointer;
`

const BoxInput = styled(Input)`
    border-color: ${colors.darkGrey};
    width: 100%;
    margin-bottom: 1.5em;
`

interface Props {}

export const FeedsComponent: React.FC<Props> = () => {
    return (
        <React.Fragment>
            <FormControl>
                <BodyContainer>
                    <BoxInput margin='10px' id='name' placeholder='nama (optional)' />
                    <Textarea
                        margin='10px'
                        id='status'
                        borderColor='#d2c7c7'
                        resize='vertical'
                        placeholder='pesan dukungan'
                    />
                    <FooterButton
                        backgroundColor={colors.red}
                        _hover={{
                            backgroundColor: "red.500"
                        }}
                    >
                        Kirim Pesan Dukungan
                    </FooterButton>
                </BodyContainer>
            </FormControl>
        </React.Fragment>
    )
}
