import styled from "@emotion/styled"
import { FormControl, Input, Textarea } from "@chakra-ui/core"
import { colors } from "components/utils/variables"

export const BoxFormControl = styled(FormControl)`
    flex-wrap: wrap;
    flex: 0 1 auto;
    width: 100%;
    justify-content: space-between;
    margin-top: 1.5em;
`

export const BoxInput = styled(Input)`
    border: none;
    border-radius: 0;
    border-bottom: 1px solid;
    border-color: ${colors.darkGrey};
    margin: 1.5em auto;
    box-shadow: none !important;
`

export const BoxTextarea = styled(Textarea)`
    border: none;
    border-radius: 0;
    border-bottom: 1px solid;
    border-color: ${colors.darkGrey};
    margin: 1.5em auto;
    box-shadow: none !important;
    height: 200px;
`
