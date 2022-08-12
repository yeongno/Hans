// FormErrorMessage.tsx

import React from "react";
import styled from "styled-components";

// styled conponents
const StyledFormErrorMessage = styled.div`
  position: absolute;
  padding-left: 5px;
  color: ${(props) => props.theme.color.main};
`;

// export
function FormErrorMessage({ errorMessage }) {
  return <StyledFormErrorMessage>{errorMessage}</StyledFormErrorMessage>;
}

export default FormErrorMessage;
