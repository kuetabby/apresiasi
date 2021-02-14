import * as React from "react"
import { useDisclosure, Spinner } from "@chakra-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBars } from "@fortawesome/free-solid-svg-icons"

import { BoxIcon } from "./styles"

const Drawer = React.lazy(() => import("./header_drawer_items").then(({ DrawerItems }) => ({ default: DrawerItems })))

interface Props {}

export const DrawerNav: React.FC<Props> = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <React.Fragment>
            <BoxIcon as='div' margin='0 15px'>
                {!isOpen && <FontAwesomeIcon onClick={onOpen} icon={faBars} />}
                {isOpen && (
                    <React.Suspense fallback={<Spinner />}>
                        <Drawer onClose={onClose} isOpen={isOpen} />
                    </React.Suspense>
                )}
            </BoxIcon>
        </React.Fragment>
    )
}
