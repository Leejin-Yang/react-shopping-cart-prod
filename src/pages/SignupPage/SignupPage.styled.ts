import styled from 'styled-components';

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 480px;
  box-sizing: border-box;
  border: 1px solid ${({ theme: { colors } }) => colors.lightGray};

  margin: 60px 0;
  padding: 50px;

  background: ${({ theme: { colors } }) => colors.white};
`;

const Title = styled.h1`
  text-align: center;

  color: ${({ theme: { colors } }) => colors.redPink};

  font-weight: 900;
  font-size: 24px;
`;

export { Page, SignupContainer, Title };
