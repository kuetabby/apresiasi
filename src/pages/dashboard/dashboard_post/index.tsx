/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from "react"
import { Box, Button, Spinner, useDisclosure } from "@chakra-ui/core"
import { gql, useQuery, useMutation } from "@apollo/client"
import { format } from "date-fns"
import styled from "@emotion/styled"

import { colors, shadows, mediaQueries } from "components/utils/variables"
import { Root, BoxWrapper } from "../styles"
import { BoxFlex } from "components/utils/flex"

import { PostCreate } from "./post_create"
import { PostEdit } from "./post_edit"

const BoxHeading = styled(Box)`
    justify-content: flex-end;
    align-items: center;
    width: 100%;
`

const ButtonActive = styled(Button)`
    border: 1px solid;
    border-radius: 0.25em;
    cursor: pointer;
    font-size: 0.8em;
    border: none;
    box-shadow: none !important;
`

const Img = styled(Box)`
    height: 200px;
    margin: 5px 40px;
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: 50%;
`

const BoxCard = styled(Box)`
    box-sizing: border-box;
    box-shadow: ${shadows.single};
    flex-basis: 100%;
    max-width: 100%;
    margin: 10px auto;
    text-decoration: none;
    padding: none !important;

    ${mediaQueries.md} {
        flex-basis: 45%;
        max-width: 45%;
        margin: 5px;
    }

    ${mediaQueries.lg} {
        flex-basis: 33%;
        max-width: 33%;
        margin: 10px auto;
    }
`

const BoxQuery = styled(Box)`
    width: 100%;
    height: 500px;
    text-align: center;
    margin-top: 1.5em;
`

const BoxText = styled(Box)`
    padding: 10px 40px;
    text-align: left;
    font-size: 1em;
`

const GET_POST = gql`
    {
        getPost {
            id
            tanggal
            title
            announcement
            post_img
        }
    }
`

const DELETE_POST = gql`
    mutation DeletePost($id: String!) {
        deletePost(id: $id) {
            deleted
        }
    }
`

const PostPage: React.FC = () => {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const { loading, error, data } = useQuery(GET_POST)

    const [DeletePost] = useMutation(DELETE_POST, {
        onCompleted: data => {
            console.log(data)
        }
    })

    const [idEdit, setIdEdit] = useState("")

    const handleVisibleEdit = (e: any) => {
        setIdEdit(e.target.id)
        onOpen()
    }

    const clearVisibleEdit = () => {
        setIdEdit("")
        onClose()
    }

    const onDeletePost = (id: string) => {
        DeletePost({
            variables: {
                id
            }
        })
    }

    return (
        <Root>
            <BoxWrapper as='div'>
                <BoxHeading d='flex'>
                    {/* <Heading as='h1' size='md' color={colors.red}>
                        Posts
                    </Heading> */}
                    <PostCreate />
                </BoxHeading>
                {error ? (
                    <BoxQuery>
                        <p>Something went wrong...</p>
                    </BoxQuery>
                ) : null}
                {loading ? (
                    <BoxQuery>
                        <Spinner />
                    </BoxQuery>
                ) : null}
                {data ? (
                    <BoxFlex margin='0 !important'>
                        {data &&
                            data.getPost.map((item: any, i: number) => (
                                <BoxCard key={i}>
                                    <BoxText>
                                        <Box>{item.title}</Box>
                                        <Box as='p' fontWeight='700' color={colors.darkGrey}>
                                            {format(new Date(item.tanggal), "dd-MM-yyyy")}
                                        </Box>
                                    </BoxText>
                                    <Img backgroundImage={`url(${item.post_img})`} />
                                    <BoxText>
                                        <Box as='div' height='100px'>
                                            {item.announcement}
                                        </Box>
                                        <Box d='flex' width='100%' marginTop='1em' justifyContent='space-between'>
                                            <ButtonActive
                                                width='45%'
                                                color={colors.white}
                                                borderColor={colors.yellow}
                                                backgroundColor={colors.yellow}
                                                _hover={{ bg: colors.yellow }}
                                                _active={{ bg: colors.yellow }}
                                                onClick={handleVisibleEdit}
                                                id={item.id}
                                            >
                                                Edit
                                            </ButtonActive>
                                            <ButtonActive
                                                width='45%'
                                                color={colors.white}
                                                borderColor={colors.red}
                                                backgroundColor={colors.red}
                                                _hover={{ bg: colors.red }}
                                                _active={{ bg: colors.red }}
                                                onClick={() => onDeletePost(item.id)}
                                            >
                                                Remove
                                            </ButtonActive>
                                        </Box>
                                    </BoxText>
                                </BoxCard>
                            ))}
                    </BoxFlex>
                ) : null}
            </BoxWrapper>
            {isOpen ? <PostEdit isOpen={isOpen} idEdit={idEdit} onClose={clearVisibleEdit} /> : null}
        </Root>
    )
}

export default PostPage
