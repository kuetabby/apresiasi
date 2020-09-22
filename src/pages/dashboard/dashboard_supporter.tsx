import React, { useState } from "react"
import { Heading, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/core"

import { Root, BoxWrapper } from "./styles"
import { colors } from "components/utils/variables"
import { TableComponent } from "components/design-system/table"

export const SupportPage: React.FC = () => {
    const [tabsIndex, setTabs] = useState(0)

    const onChange = (index: number): void => {
        setTabs(index)
    }

    return (
        <Root>
            <BoxWrapper as='div'>
                <Tabs isManual variant='enclosed' variantColor='grey' onChange={onChange}>
                    <TabPanels>
                        <TabPanel>
                            <Heading as='h1' size='md' color={colors.red}>
                                Supporter Saya
                            </Heading>
                        </TabPanel>
                        <TabPanel>
                            <Heading as='h1' size='md' color={colors.red}>
                                Supporter Anonim
                            </Heading>
                        </TabPanel>
                    </TabPanels>
                    <TabList borderColor={colors.darkGrey} borderBottom='2px solid'>
                        <Tab background={!tabsIndex ? colors.grey : "white"}>User</Tab>
                        <Tab background={tabsIndex ? colors.grey : "white"}>Anonim</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <TableComponent />
                        </TabPanel>
                        <TabPanel>
                            <TableComponent />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </BoxWrapper>
        </Root>
    )
}
