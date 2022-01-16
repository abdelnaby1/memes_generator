import React from 'react'
import styled from 'styled-components'
import Icon from '../assets/troll-face.png'
const Container = styled.div`
    display: flex;
    align-items: center;
    background: linear-gradient(90deg, #672280 1.18%, #A626D3 100%);
    height: 65px;
    color: white;
    padding: 20px;
`

const Image = styled.img`
    height: 30px;
`

const Title = styled.h2`
    margin-left: 5px;
    font-size: 25px;
    margin-right: auto;
`
const Desc = styled.h4`
    font-size: 12px;
    font-weight: 500;
`

const Header = () => {
    return (
        <Container>
                <Image src={Icon} />
                <Title>Meme Generator</Title>
            <Desc>React Course</Desc>


        </Container>
    )
}

export default Header