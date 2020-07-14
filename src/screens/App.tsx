import React, { useState } from 'react';
import './App.css';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion'

import Map from 'components/Map';
import Menu from 'components/Menu';

const CardContainerContainer = styled.div`
z-index: 10000000000;
position: absolute;
right: 0px;
top: 0px;
pointer-events: none;
`

const CardContainer = styled.div`
display: flex;
flex-direction: column;
background: #696969;
color: #dddddd;
padding: 20px;
border-radius: 15px;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
text-align: left;
margin: 10px;
`;

function App() {
    const [extraInfo, setExtraInfo] = useState(null);
    const [started, setStarted] = useState(false);
    const [currentTerm, setCurrentTerm] = useState("Testing Locations");
    return (
        <div className="App" onClick={() => setStarted(true)}>
            <header className="App-header">
                <AnimatePresence>
                    {!started &&
                        <motion.div style={{zIndex: 10000, display: 'flex', justifyContent: 'center', flexDirection: 'column', height: '100vh', width: '100vw', backgroundColor: '#282c34'}}
                            exit={{opacity: 0, translateY: 10}} transition={{duration: 0.5}}>
                            <span style={{fontSize: 160}}>Coronaid</span>
                            <br/>
                            <span style={{fontSize: 40}}>Your Go To Stop To Get Relief Resources Fast</span>
                        </motion.div>
                    }
                </AnimatePresence>
                <div style={{opacity: started ? 1 : 0, width: "100vw", height: "100vh"}}>
                    <Map extraInfoHandler={setExtraInfo} currentTerm={currentTerm}/>
                    <CardContainerContainer>
                        <AnimatePresence>
                            {extraInfo !== null &&
                                <motion.div
                                initial={{opacity: 0, translateY: 10}}
                                animate={{opacity: 1, translateY: 0}}
                                exit={{opacity: 0, translateY: 10}} transition={{duration: 0.2}}>
                                    <CardContainer>
                                        <span>{(extraInfo as any)[0]}</span>
                                        {(extraInfo as any)[1] !== '' && <>
                                            <br/>
                                            <span style={{fontSize: 20}} dangerouslySetInnerHTML={{__html: (extraInfo as any)[1]}}/>
                                        </>}
                                    </CardContainer>
                                </motion.div>
                            }
                        </AnimatePresence>
                    </CardContainerContainer>
                    <Menu setCurrentTerm={setCurrentTerm}/>
                </div>
            </header>
        </div>
    );
}

export default App;
