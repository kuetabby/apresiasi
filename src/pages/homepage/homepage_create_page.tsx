import * as React from "react"
import styled from "@emotion/styled"
import { Box, Button, FormControl, FormLabel, Input, Heading } from "@chakra-ui/core"

import { WrapperCreatePage } from "./styles"
import { colors, mediaQueries } from "components/utils/variables"

// interface Props {

// }

const ButtonSubmit = styled(Button)`
    border: 1px solid lightblue;
    border-radius: 0.25em;
    color: white;
    font-size: 1em;
    width: 20%;

    cursor: pointer;
    ${mediaQueries.smMax} {
        width: 100%;
        max-width: 100%;
    }
`

const Form = styled(FormControl)`
    border: 2px dashed;
    border-color: ${colors.blue};
    border-radius: 0.25em;
    margin: 0 auto;
    padding: 30px;
    max-width: 700px;
`
const FormSub = styled(FormLabel)`
    margin-bottom: 20px;
`

const InputGroup = styled(Box)`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`

const InputDomain = styled(Box)`
    display: flex;
    font-size: 1.5em;
`
const InputSlash = styled.strong`
    margin: 0 5px;
`

export const CreatePageComponent: React.FC = () => {
    return (
        <WrapperCreatePage>
            <Form>
                <Heading as='h1'>Buat Halaman</Heading>
                <FormSub htmlFor='text'>Dapatkan link unik menuju halamanmu</FormSub>
                <InputGroup>
                    <InputDomain>
                        Apresiasi <InputSlash>/</InputSlash>
                    </InputDomain>
                    <Input type='text' size='sm' width='50%' id='text' />
                </InputGroup>
                <ButtonSubmit variantColor='blue'>Buat</ButtonSubmit>
            </Form>
        </WrapperCreatePage>
    )
}
