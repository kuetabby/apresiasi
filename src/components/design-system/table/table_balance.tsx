/* eslint-disable react/prop-types */
import * as React from "react"
import { Button } from "@chakra-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
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

export const TableBalance: React.FC = () => {
    const data = React.useMemo(
        () => [
            {
                firstName: "ken",
                lastName: "lol",
                age: 5,
                visits: 81,
                progress: 40,
                status: "relationship"
            },
            {
                firstName: "session",
                lastName: "fruit",
                age: 23,
                visits: 1,
                progress: 55,
                status: "single"
            },
            {
                firstName: "knee",
                lastName: "laborer",
                age: 5,
                visits: 81,
                progress: 40,
                status: "relationship"
            }
        ],
        []
    )
    const columns = React.useMemo(
        () => [
            {
                Header: "Pencapaian Target",
                columns: [
                    {
                        Header: "Jumlah",
                        accessor: "firstName",

                        sortType: "basic"
                    },
                    {
                        Header: "Tanggal",
                        accessor: "lastName",

                        sortType: "basic"
                    },
                    {
                        Header: "Deskripsi"
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
                        {rows.map(row => {
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
