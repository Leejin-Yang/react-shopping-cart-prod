import styled from 'styled-components';

export default styled.section`
  display: flex;
  justify-content: space-between;
  height: 80px;
  padding: 0 15%;
  background-color: ${({ theme }) => theme.green_50};

  button {
    cursor: pointer;
    background: none;
    border: none;
  }

  .home {
    cursor: pointer;
    height: 100%;
  }

  .home img {
    width: 50px;
    height: 44px;
    margin-right: 14px;
  }

  .home button {
    font-size: 4rem;
    font-weight: 700;
    color: white;
  }

  .nav {
    height: 100%;
    display: flex;
    gap: 20px;
    & button:last-of-type {
      margin-right: 0;
    }
  }

  .nav button {
    margin-right: 40px;
    font-size: 2.4rem;
    font-weight: 500;
    color: white;
  }

  @media screen and (max-width: 1000px) {
    padding: 0 11%;

    .home button {
      font-size: 3rem;
    }

    .nav {
      gap: 10px;
    }

    .nav button {
      font-size: 2rem;
    }
  }

  @media screen and (max-width: 700px) {
    padding: 0 20px;

    .home button {
      font-size: 2.5rem;
    }

    .nav button {
      font-size: 1.8rem;
    }
  }
`;
