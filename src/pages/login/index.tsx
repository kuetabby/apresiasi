import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faGoogle
    // faFacebook
} from "@fortawesome/free-brands-svg-icons"
import Cookie from "js-cookie"
import { Heading } from "@chakra-ui/core"
import { GoogleLogin } from "react-google-login"
import { gql, useMutation } from "@apollo/client"
import { Redirect } from "react-router-dom"
import "./styles.css"

import { Root } from "pages/homepage/styles"
import { Card, Content, Divider, Row, SubHeading, ButtonLogin, Icon } from "./styles"
import { FooterComponent } from "components/design-system/footer"

const LOGIN = gql`
    mutation LoginUser($email: String!, $name: String!) {
        loginUser(data: { email: $email, name: $name }) {
            accessToken
        }
    }
`

const LoginPage: React.FC = () => {
    const [isLogin, setLogin] = useState(false)

    const [LoginUser] = useMutation(LOGIN, {
        onCompleted: data => {
            Cookie.set("token", data.loginUser.accessToken)
            if (data.loginUser.accessToken) {
                setLogin(true)
            }
        }
    })

    const responseGoogle = (response: any): any => {
        const { profileObj } = response
        const { email, name } = profileObj
        LoginUser({
            variables: {
                email,
                name
            }
        })
    }

    if (isLogin) {
        return <Redirect to='/manage/dashboard' />
    }

    return (
        <React.Fragment>
            <Root>
                <Content>
                    <Card>
                        <Heading marginTop='1.5em' as='h2'>
                            Login
                        </Heading>
                        <SubHeading>Your social media network</SubHeading>
                        <Divider> &nbsp;With&nbsp;</Divider>
                        <Row height='200px' justifyContent='center' alignItems='center'>
                            <GoogleLogin
                                clientId='870038063318-dlonfedlp0v33u32q4s59881pnussffk.apps.googleusercontent.com'
                                render={(renderProps: {
                                    onClick: () => void
                                    disabled?: boolean | undefined
                                }): JSX.Element => (
                                    <ButtonLogin
                                        background='#db4437'
                                        onClick={renderProps.onClick}
                                        variantColor='red'
                                        variant='solid'
                                    >
                                        <Icon>
                                            <FontAwesomeIcon icon={faGoogle} />
                                        </Icon>
                                        {"Google"}
                                    </ButtonLogin>
                                )}
                                isSignedIn={false}
                                onSuccess={responseGoogle}
                                onFailure={responseGoogle}
                            />
                        </Row>
                    </Card>
                </Content>
            </Root>
            <FooterComponent />
        </React.Fragment>
    )
}

export default LoginPage
