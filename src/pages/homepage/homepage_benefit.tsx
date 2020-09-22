import * as React from "react"
import styled from "@emotion/styled"
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons"
import { Heading, Box } from "@chakra-ui/core"
import { WrapperBenefit, BenefitIcons } from "./styles"

import { mediaQueries } from "components/utils/variables"

const SubRow = styled(Box)`
    display: flex;
    flex: 0 1 auto;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    width: 30%;
    height: 20%;

    ${mediaQueries.lgMax} {
        width: 100%;
        margin-top: 50px;
    }
`
const SubIcon = styled(Box)`
    text-align: center;
    height: 30px;
`
const SubTitle = styled(Box)`
    font-size: 1.25em;
    font-weight: 700;
`
const SubContent = styled(Box)`
    margin-top: 20px;
    font-size: 1em;
`

export const BenefitComponent: React.FC = () => {
    return (
        <WrapperBenefit>
            <Heading>Kenapa Harus Apresiasi?</Heading>
            <Box>Apresiasi berusaha membangun budaya apresiasi karya dengan melibatkan para penggemar dan kreator</Box>
            <Box d='flex' justifyContent='center' margin='50px auto'>
                <SubRow>
                    <SubIcon>
                        <BenefitIcons icon={faMoneyBill} />
                    </SubIcon>
                    <SubTitle>Donasi</SubTitle>
                    <SubContent>
                        Terima donasi secara langsung dari penikmat karyamu dengan metode pembayaran yang bersahabat.
                    </SubContent>
                </SubRow>
                {/* <SubRow>
                    <SubIcon>
                        <BenefitIcons icon={faInbox} />
                    </SubIcon>
                    <SubTitle>Halaman Karya</SubTitle>
                    <SubContent>
                        Tampilkan karya terbaik kamu pada halaman karya. Penggemar kamu bisa mengakses halaman dengan
                        link unik.
                    </SubContent>
                </SubRow> */}
                {/* <SubRow>
                    <SubIcon>
                        <BenefitIcons icon={faCalendar} />
                    </SubIcon>
                    <SubTitle>Subscriptions</SubTitle>
                    <SubContent>
                        Dapatkan penghasilan bulanan dan berikan hadiah pada penggemar kamu dengan konten eksklusif
                    </SubContent>
                </SubRow> */}
            </Box>
        </WrapperBenefit>
    )
}
