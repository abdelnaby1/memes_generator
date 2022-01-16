import {useState,useEffect} from 'react'
import styled,{keyframes} from 'styled-components'
const Container = styled.div`
 display: flex;
 align-items: center;
 /* justify-content: space-around; */
 flex-direction: column;
 height: calc(100vh - 65px);
 overflow: hidden;
`
const Form = styled.form`
    display: flex;
    align-items:center;
    justify-content: center;
    flex-direction: column;
    height: 20%;
    width: 80%;
    margin:50px 0px 10px 0px;
`
const transofrmHorzintalY1 = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;
const transofrmHorzintalY2 = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;
const transofrmVertical = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;
const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 55%;
    margin-bottom: 30px;
    animation: ${transofrmHorzintalY1} 1s ease-in-out ;
    
`


const Input = styled.input`
    width: 48%;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid #d5d4d8;
    text-indent: 5px;
    font-family: "Karla", sans-serif;


`
const Button = styled.button`
    width: 55%;
    padding: 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-size: 20px;
    font-weight: 600;
    background: linear-gradient(90deg, #672280 1.18%, #A626D3 100%);
    font-family: "Karla", sans-serif;

    animation: ${transofrmHorzintalY2} 1s ease-in-out;

`
const MemeContainer = styled.div`
    width: 80%;
    height: 70%;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${transofrmVertical} 1s ease-in-out;
    position: relative;
`

const Image = styled.img`   
    height: 100%;
    /* position: absolute; */
    /* object-fit: contain; */
    /* object-position: center; */
    width:55%;

    
`
const TopText = styled.h1`
 position: absolute;
    width: 80%;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    margin: 15px 0;
    padding: 0 5px;
    font-family: impact, sans-serif;
    font-size: 2em;
    text-transform: uppercase;
    color: white;
    letter-spacing: 1px;
    text-shadow:
        2px 2px 0 #000,
        -2px -2px 0 #000,
        2px -2px 0 #000,
        -2px 2px 0 #000,
        0 2px 0 #000,
        2px 0 0 #000,
        0 -2px 0 #000,
        -2px 0 0 #000,
        2px 2px 5px #000;
        top: 10%;
`
const BottomText = styled.h1`
    position: absolute;
    width: 80%;
    text-align: center;
    left: 50%;
    transform: translateX(-50%);
    margin: 15px 0;
    padding: 0 5px;
    font-family: impact, sans-serif;
    font-size: 2em;
    text-transform: uppercase;
    color: white;
    letter-spacing: 1px;
    text-shadow:
        2px 2px 0 #000,
        -2px -2px 0 #000,
        2px -2px 0 #000,
        -2px 2px 0 #000,
        0 2px 0 #000,
        2px 0 0 #000,
        0 -2px 0 #000,
        -2px 0 0 #000,
        2px 2px 5px #000;
        bottom: 10%;
`
const Meme = () => {
    const [meme,setMeme] = useState({
        topText: "",
        bottomText:"",
        randomeImage:"https://i.imgflip.com/1g8my4.jpg"
    })
    const [allMemes,setAllMemes] = useState([]);
     useEffect(() => {
         const getMemes = async () => {
             let res = await fetch("https://api.imgflip.com/get_memes");
             const data = await res.json();
             const memes = data.data.memes.filter((meme)=> {
                    return meme.box_count <=2
            })
            setAllMemes(memes)

         }
        getMemes();
    }, [])
    const getMemeImage = () => {
        const randomeNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomeNumber].url;
        setMeme((prevMeme)=> ({
            ...prevMeme,
            randomeImage:url
        }));
    }
    const handelChange = (e) =>{
        const {name,value} = e.target;
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
     return (
        <Container>
            <Form onSubmit={(e)=> e.preventDefault()}>
                <InputContainer >
                    <Input 
                        placeholder='Top text' 
                        name='topText' 
                        value={meme.topText}
                        onChange={handelChange}
                    />
                    <Input right={true}
                        placeholder='Bottom text'
                        name='bottomText' 
                        value={meme.bottomText}
                        onChange={handelChange}
                    />
                </InputContainer>

                <Button onClick={getMemeImage}>Get new meme image</Button>
            </Form>
            <MemeContainer>
                {meme &&(
                    <>
                    <Image src={meme.randomeImage} />
                    <TopText>{meme.topText}</TopText>
                    <BottomText>{meme.bottomText}</BottomText>
                    </>

                )}
            </MemeContainer>
           

        </Container>
    )
}

export default Meme
