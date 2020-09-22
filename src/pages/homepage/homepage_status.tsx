import * as React from "react"
import styled from "@emotion/styled"
import { Heading, Box } from "@chakra-ui/core"

import { WrapperStatus } from "./styles"
import { mediaQueries } from "components/utils/variables"

// interface Props {

// }

const Content = styled(Box)`
    display: flex;
    flex: 0 1 auto;
    flex-wrap: wrap;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 10px 0;

    ${mediaQueries.lg} {
        padding: 0px 100px;
    }
`
const SubContent = styled(Box)`
    max-width: 30%;
    flex-basis: 30%;
    margin: 1em auto;

    ${mediaQueries.mdMax} {
        max-width: 100%;
        flex-basis: 100%;
    }
`

const TextContent = styled.span`
    font-size: 1em;
`

export const StatusComponent: React.FC = () => {
    return (
        <WrapperStatus>
            <Content>
                <SubContent>
                    <Heading as='h4' margin='0'>
                        61.588
                    </Heading>
                    <TextContent>Kreator Bergabung</TextContent>
                </SubContent>
                {/* <SubContent>
                    <Heading as='h4' margin='0'>
                        64.954
                    </Heading>
                    <TextContent>Penikmat Karya</TextContent>
                </SubContent> */}
                <SubContent>
                    <Heading as='h4' margin='0'>
                        35.957
                    </Heading>
                    <TextContent>Dukungan Terkumpul</TextContent>
                </SubContent>
            </Content>
        </WrapperStatus>
    )
}
