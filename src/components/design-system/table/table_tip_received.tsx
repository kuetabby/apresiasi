/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable react/prop-types */
import * as React from "react"
import { Button, Spinner, Box } from "@chakra-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { gql, useQuery } from "@apollo/client"
import { format } from "date-fns"

import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons"
import { useTable, useSortBy, useGlobalFilter, usePagination, useFlexLayout, useResizeColumns } from "react-table"
import styled from "@emotion/styled"

import {
    colors,
    shadows
    // mediaQueries
} from "components/utils/variables"

declare module "react-table" {
    // take this file as-is, or comment out the sections that don't apply to your plugin configuration

    export interface TableOptions<D extends object>
        extends UseExpandedOptions<D>,
            UseFiltersOptions<D>,
            UseGlobalFiltersOptions<D>,
            UseGroupByOptions<D>,
            UsePaginationOptions<D>,
            UseResizeColumnsOptions<D>,
            UseRowSelectOptions<D>,
            UseRowStateOptions<D>,
            UseSortByOptions<D>,
            // note that having Record here allows you to add anything to the options, this matches the spirit of the
            // underlying js library, but might be cleaner if it's replaced by a more specific type that matches your
            // feature set, this is a safe default.
            Record<string, any> {}

    export interface Hooks<D extends object = {}>
        extends UseExpandedHooks<D>,
            UseGroupByHooks<D>,
            UseRowSelectHooks<D>,
            UseSortByHooks<D> {}

    export interface TableInstance<D extends object = {}>
        extends UseColumnOrderInstanceProps<D>,
            UseExpandedInstanceProps<D>,
            UseFiltersInstanceProps<D>,
            UseGlobalFiltersInstanceProps<D>,
            UseGroupByInstanceProps<D>,
            UsePaginationInstanceProps<D>,
            UseRowSelectInstanceProps<D>,
            UseRowStateInstanceProps<D>,
            UseSortByInstanceProps<D> {}

    export interface TableState<D extends object = {}>
        extends UseColumnOrderState<D>,
            UseExpandedState<D>,
            UseFiltersState<D>,
            UseGlobalFiltersState<D>,
            UseGroupByState<D>,
            UsePaginationState<D>,
            UseResizeColumnsState<D>,
            UseRowSelectState<D>,
            UseRowStateState<D>,
            UseSortByState<D> {}

    export interface ColumnInterface<D extends object = {}>
        extends UseFiltersColumnOptions<D>,
            UseGlobalFiltersColumnOptions<D>,
            UseGroupByColumnOptions<D>,
            UseResizeColumnsColumnOptions<D>,
            UseSortByColumnOptions<D> {}

    export interface ColumnInstance<D extends object = {}>
        extends UseFiltersColumnProps<D>,
            UseGroupByColumnProps<D>,
            UseResizeColumnsColumnProps<D>,
            UseSortByColumnProps<D> {}

    export interface Cell<D extends object = {}, V = any> extends UseGroupByCellProps<D>, UseRowStateCellProps<D> {}

    export interface Row<D extends object = {}>
        extends UseExpandedRowProps<D>,
            UseGroupByRowProps<D>,
            UseRowSelectRowProps<D>,
            UseRowStateRowProps<D> {}
}

interface GlobalFilterProps {
    globalFilter: string | number
    setGlobalFilter: (value: string | number | undefined) => void
}

const TableWrapper = styled.div`
    margin-top: 1em;
    overflow: auto;
    display: block;
    width: 100%;

    table {
        border-spacing: 0;
        width: 100%;

        tr {
            :first-of-type {
                td {
                    background-color: ${colors.darkPink};
                }
            }
        }

        th,
        td {
            margin: 0 auto;
            padding: 1.3em;
        }

        td {
            text-align: center;
            font-weight: 500;
            border: 1px solid;
            border-color: ${colors.pink};
        }
    }
`

const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1em;
    text-align: center;
    width: 100%;
    height: 100px;
`

const PaginationButton = styled(Button)`
    margin: 0 5px;
    font-weight: 600;
    background-color: ${colors.white};
    border: 2px solid;
    border-radius: 0.25em;
    width: 150px;

    &:hover {
        background-color: ${colors.darkGrey};
    }
`

const BoxQuery = styled(Box)`
    width: 100%;
    height: 500px;
    text-align: center;
    margin-top: 1.5em;
`

const InputFilter = styled.input`
    font-size: 1.2em;
    padding: 10px;
    border: 1px solid;
    border-color: ${colors.darkGrey};
    border-radius: 0.25em;
    outline: none;
    margin-left: 0.25em;
    box-shadow: ${shadows.single};
`

const GlobalFilter: React.FC<GlobalFilterProps> = ({ globalFilter, setGlobalFilter }) => {
    const styled = {
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100px",
        margin: "0 auto"
    }

    return (
        <div style={styled}>
            <p>Search:</p>
            <InputFilter
                value={globalFilter || ""}
                onChange={(e): void => {
                    setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                }}
            />
        </div>
    )
}

const GET_TRANSACTION = gql`
    {
        getCurrentUserTransaction {
            payment_tanggal
            payment_amount
            customer_name
            pesan_dukungan
        }
    }
`

export const TableTipReceived: React.FC = () => {
    const { loading, error, data: transaction } = useQuery(GET_TRANSACTION)

    const data = React.useMemo(() => {
        const data_array: { tanggal: string; name: string; pesan: string; amount: string }[] = []
        for (const key in transaction && transaction.getCurrentUserTransaction) {
            data_array.push({
                tanggal: format(new Date(transaction.getCurrentUserTransaction[key].payment_tanggal), "dd-MM-yyyy"),
                name: transaction.getCurrentUserTransaction[key].customer_name,
                pesan: transaction.getCurrentUserTransaction[key].pesan_dukungan,
                amount: Number(transaction.getCurrentUserTransaction[key].payment_amount).toLocaleString()
            })
        }
        return data_array
    }, [transaction])

    const columns = React.useMemo(
        () => [
            {
                Header: "Pencapaian Target",
                columns: [
                    {
                        Header: "Tanggal",
                        accessor: "tanggal",

                        sortType: "basic"
                    },
                    {
                        Header: "Supporter",
                        accessor: "name",

                        sortType: "basic"
                    },
                    {
                        Header: "Pesan Dukungan",
                        accessor: "pesan"
                    },
                    {
                        Header: "Nominal",
                        accessor: "amount"
                    }
                ] // accessor is the "key" in the data
            }
        ],
        []
    )

    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 50,
            width: 100,
            maxWidth: 200
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        state,
        setGlobalFilter,
        canPreviousPage,
        canNextPage,
        nextPage,
        previousPage,
        headerGroups,
        rows,
        prepareRow,
        state: { pageIndex }
    } = useTable(
        {
            data,
            columns,
            defaultColumn
        },
        useGlobalFilter,
        useSortBy,
        useFlexLayout,
        usePagination,
        useResizeColumns
    )

    if (error) {
        return (
            <BoxQuery>
                <p>Something went wrong...</p>
            </BoxQuery>
        )
    }

    if (loading) {
        return (
            <BoxQuery>
                <Spinner />
            </BoxQuery>
        )
    }

    return (
        <React.Fragment>
            <TableWrapper>
                <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup, i: number) => (
                            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => {
                                    return (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())} key={column.id}>
                                            {column.isSorted ? (
                                                <span style={{ margin: "10px" }}>
                                                    {column.isSortedDesc ? (
                                                        <FontAwesomeIcon fontSize='20px' icon={faAngleUp} />
                                                    ) : (
                                                        <FontAwesomeIcon fontSize='20px' icon={faAngleDown} />
                                                    )}
                                                </span>
                                            ) : (
                                                ""
                                            )}
                                            {column.render("Header")}
                                        </th>
                                    )
                                })}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows &&
                            rows.map(row => {
                                // console.log(row)
                                prepareRow(row)
                                return (
                                    <tr key={row.id} {...row.getRowProps()}>
                                        {row.cells.map((cell, i: number) => {
                                            return (
                                                <td key={i} {...cell.getCellProps()}>
                                                    {cell.render("Cell")}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                    </tbody>
                </table>
            </TableWrapper>
            <PaginationWrapper>
                <PaginationButton onClick={(): void => previousPage()} isDisabled={!canPreviousPage}>
                    Previous
                </PaginationButton>
                <PaginationButton isDisabled width='100px !important'>
                    {pageIndex + 1}
                </PaginationButton>
                <PaginationButton onClick={(): void => nextPage()} isDisabled={!canNextPage}>
                    Next
                </PaginationButton>
            </PaginationWrapper>
        </React.Fragment>
    )
}
