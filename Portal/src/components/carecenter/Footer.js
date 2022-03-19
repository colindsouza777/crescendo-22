import React from 'react'
import {MdCopyright} from 'react-icons/md'
import styled from "styled-components";

const FooterContainer= styled.footer`
  padding:15px 15px;
  background-color:#552A9A;
  display:flex;
  justify-content:center;
  align-items:center;
  /* max-width:1100px; */
  margin:0 auto;
  width:100%;
  
`;

const FooterItems=styled.div`
    color:#fff;
    padding:10px;
`
const Footer = () => {
  return (
    <>
    <FooterContainer>
        <FooterItems>
       Team Infura <MdCopyright/> 2022 
        
        </FooterItems>
    </FooterContainer>
    </>
  )
}

export default Footer;