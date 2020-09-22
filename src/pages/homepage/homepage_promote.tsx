import * as React from "react"
import styled from "@emotion/styled"
import { Box, FormControl, FormLabel, Input, Button, Heading } from "@chakra-ui/core"

import { WrapperPromote } from "./styles"

// interface Props {

// }

const Form = styled(FormControl)`
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

export const PromoteComponent: React.FC = () => {
    return (
        <WrapperPromote>
            <Form>
                <Heading as='h1'>Buat Halaman</Heading>
                <FormSub htmlFor='text'>Dapatkan link unik menuju halamanmu</FormSub>
                <InputGroup>
                    <InputDomain>
                        Apresiasi <InputSlash>/</InputSlash>
                    </InputDomain>
                    <Input type='text' size='sm' width='50%' id='text' />
                </InputGroup>
                <Button>Buat</Button>
            </Form>
        </WrapperPromote>
    )
}
