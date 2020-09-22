import * as React from "react"
import { Heading } from "@chakra-ui/core"
import styled from "@emotion/styled"

// import { mediaQueries } from "components/utils/variables"
import { WrapperCreator } from "./styles"

// interface Props {

// }

const SubText = styled.div`
    font-size: 1em;
    font-weight: 700;
`

export const CreatorComponent: React.FC = () => {
    return (
        <WrapperCreator>
            <Heading>Siapa kreator yang telah bergabung?</Heading>
            <SubText>
                Ribuan kreator yang telah bergabung. Mulai dari Youtuber, Podcaster, Komikus, Penulis, Developer dan
                banyak lagi.
            </SubText>
        </WrapperCreator>
    )
}
