import styled from '@emotion/styled';

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  font-family: 'Roboto';
  @media screen and (min-width: 768px) {
    display: block;
  }
  /* margin-bottom: 20px; */
`;

export const Greetings = styled.div`
  flex: 1;
  margin-bottom: 10px;
  margin-right: 10px;
  /* display: block;
  margin-bottom: 20px;
  font-family: 'Roboto'; */
`;
export const UserName = styled.span`
  font-weight: 500;
  /* display: block;
  margin-bottom: 20px;
  font-family: 'Roboto'; */
`;
