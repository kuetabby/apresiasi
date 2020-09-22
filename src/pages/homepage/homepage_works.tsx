import * as React from "react"
import styled from "@emotion/styled"
import { Heading } from "@chakra-ui/core"

import { Row, WrapperWorks } from "./styles"
// interface Props {

// }
const TextContent = styled.div`
    font-size: 1em;
    margin-bottom: 30px;
`

export const WorksComponent: React.FC = () => {
    return (
        <WrapperWorks>
            <Heading as='h1'>Bagaimana Cara Kerjanya?</Heading>
            <TextContent>Pelajari cara mengatur kontenmu dengan mudah dan tetap terhubung dengan penggemar</TextContent>
            <Row padding='0 30px'>
                <div>Gambar</div>
                <div>Step 1</div>
            </Row>
            <Row padding='0 30px'>
                <div>Gambar</div>
                <div>Step 1</div>
            </Row>
            <Row padding='0 30px'>
                <div>Gambar</div>
                <div>Step 1</div>
            </Row>
        </WrapperWorks>
    )
}
