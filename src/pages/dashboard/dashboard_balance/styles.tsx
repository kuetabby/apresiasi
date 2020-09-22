import styled from "@emotion/styled"
import { FormControl, Box, Input, Button, Select } from "@chakra-ui/core"
import { mediaQueries, colors } from "components/utils/variables"

export const BoxFormControl = styled(FormControl)`
    flex-wrap: wrap;
    flex: 0 1 auto;
    width: 100%;
    height: 500px;
    justify-content: space-between;
    margin-top: 1.5em;
`

export const BoxForm = styled(Box)`
    flex: 0 1 auto;
    max-width: 100%;
    flex-basis: 100%;
    padding: 0 0.5em;

    ${mediaQueries.lgMax} {
        max-width: 100%;
        flex-basis: 100%;
        padding: 0;
        margin-top: 2em;
    }
`

export const BoxInput = styled(Input)`
    border-color: ${colors.darkGrey};
    margin-bottom: 1.5em;
    width: 100%;
    padding: 0px 0px 1px 16px;
`

export const BoxSelect = styled(Select)`
    border-color: ${colors.darkGrey};
    margin-bottom: 1.5em;
    width: 100% !important;
`

export const ButtonSave = styled(Button)`
    border-radius: 0.25em;
    cursor: pointer;
    background-color: ${colors.green};
    border: none;
    float: right;
    color: ${colors.white};

    &:hover {
        background-color: ${colors.darkGreen};
    }
`
