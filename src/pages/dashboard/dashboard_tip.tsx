/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from "react"
import {
    // Box,
    Heading
    // Select,
    // Button
} from "@chakra-ui/core"
// import styled from "@emotion/styled"
// import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import { Root, BoxWrapper } from "./styles"
import { colors } from "components/utils/variables"
import { TableTipReceived } from "components/design-system/table/table_tip_received"
// import { BoxFlex, BoxItem4 as BoxFilter } from "components/utils/flex"

// const ButtonClear = styled(Button)`
//     border-radius: 0.25em;
//     cursor: pointer;
//     padding: 2px 7px;
//     background-color: ${colors.grey};
//     border: none;

//     &:hover {
//         background-color: ${colors.darkGrey};
//     }
// `

// const DateControl = styled(DatePicker)`
//     border: 1px solid;
//     border-radius: 0.25em;
//     outline: none;
//     height: 2.5em;
//     padding: 0 10px;
// `

export const TipPage: React.FC = () => {
    // const [startDate, setStartDate] = useState(new Date())

    // const onChange = (date: any) => setStartDate(date)

    return (
        <Root>
            <BoxWrapper as='div'>
                <Heading as='h1' size='md' color={colors.red}>
                    Dukungan Diterima
                </Heading>
                <Heading as='h4' size='md' margin='0 auto'>
                    Total Dukungan Diterima : Rp 0
                </Heading>
                {/* <BoxFlex marginTop='1.5em' justifyContent='space-between'>
                    <BoxFilter>
                        <Box as='fieldset' borderColor={colors.red}>
                            <Box as='legend'>Filter Bulan</Box>
                            <Box d='flex' flexWrap='wrap' width='100%'>
                                <Box as='span' margin='10px'>
                                    <Select placeholder='Select Option'>
                                        <option value='option1'>Option 1</option>
                                        <option value='option2'>Option 2</option>
                                        <option value='option3'>Option 3</option>
                                    </Select>
                                </Box>
                                <Box as='span' margin='10px'>
                                    <Select placeholder='Semua Tahun'>
                                        <option value='2020'>2020</option>
                                        <option value='2019'>2019</option>
                                    </Select>
                                </Box>
                                <Box as='span' margin='10px'>
                                    <ButtonClear>Clear</ButtonClear>
                                </Box>
                            </Box>
                        </Box>
                    </BoxFilter>
                    <BoxFilter>
                        <Box as='fieldset' borderColor={colors.red}>
                            <Box as='legend'>Filter Tanggal</Box>
                            <Box d='flex' flexWrap='wrap' width='100%'>
                                <Box as='span' margin='10px'>
                                    <DateControl
                                        id='start_tanggal'
                                        showMonthDropdown
                                        showYearDropdown
                                        dateFormat='dd/MM/yyyy'
                                        showDisabledMonthNavigation
                                        selected={startDate}
                                        onChange={onChange}
                                    />
                                </Box>
                                <Box as='span' margin='10px'>
                                    <ButtonClear>Clear</ButtonClear>
                                </Box>
                            </Box>
                        </Box>
                    </BoxFilter>
                </BoxFlex> */}
                <TableTipReceived />
            </BoxWrapper>
        </Root>
    )
}
