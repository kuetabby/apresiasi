import * as React from "react"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
    WrapperFooter,
    RowContent
    // SubContent,
    // Title
} from "./styles"

export const FooterComponent: React.FC = () => {
    return (
        <WrapperFooter>
            {/* <RowContent justify='space-evenly'>
                <SubContent>
                    <Title>Produk</Title>
                    <div>Explore</div>
                    <div>Cari Kreator </div>
                    <div>Buat Halaman</div>
                    <div>Fitur dan Harga</div>
                </SubContent>
                <SubContent>
                    <Title>Informasi</Title>
                    <div>Explore</div>
                    <div>Cari Kreator </div>
                    <div>Buat Halaman</div>
                    <div>Fitur dan Harga</div>
                </SubContent>
                <SubContent>
                    <Title>Hubungi Kami</Title>
                    <div>Explore</div>
                    <div>Cari Kreator </div>
                    <div>Buat Halaman</div>
                    <div>Fitur dan Harga</div>
                </SubContent>
            </RowContent> */}

            <RowContent justify='space-between'>
                <div>© All rights reserved.Some image by Freepik</div>
                <div>Seluruh transaksi pembayaran diproses menggunakan Duitku</div>
            </RowContent>
        </WrapperFooter>
    )
}
