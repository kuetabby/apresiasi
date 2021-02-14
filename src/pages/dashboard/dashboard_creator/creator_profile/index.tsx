import * as React from "react"
import { Box, Avatar } from "@chakra-ui/core"
import styled from "@emotion/styled"

import { colors } from "components/utils/variables"
import { BoxItem2 as BoxLeft } from "components/utils/flex"

import { Goal } from "./goal"
import { Profile } from "./profile"

const BoxWrapper = styled(Box)`
    border: 2px dashed;
    border-radius: 0.4em;
    border-color: ${colors.yellow};
    padding: 10px;
    margin: 20px;
`

interface Props {
    data: any
}

const CreatorProfileComponent: React.FC<Props> = ({ data }) => {
    return (
        <BoxLeft margin='1em 0' textAlign='center' backgroundColor={colors.grey}>
            <BoxWrapper>
                <Avatar name={data.name || "name"} size='2xl' src={data.profile_img || ""} />
                <Box as='h2' marginBottom='0px !important'>
                    {data.name || "name"}
                </Box>
                <Box as='p' marginTop='0px !important'>
                    @{data.username || "username"}
                </Box>
                <Profile data={data} />
            </BoxWrapper>
            <BoxWrapper>
                <Box as='p'>{data.judul || "Judul"}</Box>
                <Box as='p' marginBottom='5px !important'>
                    Rp {Number(data.balance).toLocaleString() || 0} terkumpul dari Rp{" "}
                    {Number(data.target_dana).toLocaleString() || 0}
                </Box>
                <Goal data={data} />
            </BoxWrapper>
        </BoxLeft>
    )
}

export default CreatorProfileComponent
