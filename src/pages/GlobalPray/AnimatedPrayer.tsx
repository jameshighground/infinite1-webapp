import styled, { keyframes } from "styled-components";

const heartBeat = keyframes`
	0%,100% { opacity: 0 }
	50% { opacity: 1 }
`;


export const AnimatedPrayer = styled.div`
  animation: ${heartBeat} 5s infinite;
`;