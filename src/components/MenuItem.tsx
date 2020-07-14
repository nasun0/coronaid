import React from 'react';
import { motion } from 'framer-motion';
import { FaVial, FaHospital, FaBreadSlice, FaBriefcase } from 'react-icons/fa';


const variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
}

const names = ["COVID TESTING SITES", "HOSPITALS", "FOOD BANKS", "UNEMPLOYMENT CENTER"];
const icons = [<FaVial/>, <FaHospital/>, <FaBreadSlice/>, <FaBriefcase/>];
const results = ["Testing Locations", "Hospital", "Food Bank", "Unemployment Center"];

function MenuItem(props: {i: number, setCurrentTerm: (term: string) => void}) {
    return (
        <motion.li variants={variants} whileHover={{scale: 1.1}} whileTap={{scale: 0.95}} style={{marginBottom: 30}}
         onClick={() => props.setCurrentTerm(results[props.i])}>
            <div style={{width: 30, height: 30}}>
                {icons[props.i]}
            </div>
            <span style={{marginLeft: 10, textAlign: "left"}}>{ names[props.i] }</span>
        </motion.li>
    )
}

export default MenuItem;