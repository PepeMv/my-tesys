import styled from '@emotion/styled';

export const Formulario = styled.div`
    max-width: 600px;
    width: 95%;
    margin: 0.5rem auto 0 auto;
    border: 2px solid #ff5722;
    border-radius: 10px;
    font-size: 1.5rem;
    padding: 2rem;    
    text-align: center;
`;

export const Campo = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    label {
        flex: 0 0 150px;
        font-size: 1.8rem;
    }
    input, 
    textarea {
        flex: 1;
        padding: 1rem;
    }
    textarea {
        height: 400px;
    }
`;

export const InputSubmit = styled.input`
    background-color: var(--naranja);
    width: 100%;
    padding: 1.5rem;
    text-align: center;
    color: #FFF;
    font-size: 1.8rem;
    text-transform: uppercase;
    border: none;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    &:hover {
        cursor: pointer;
    }
`;

export const Error = styled.p`
    background-color: red;
    padding: 1rem;
    font-family: 'PT Sans', sans-serif;
    font-weight: 700;
    font-size: 1.4rem;
    color: #FFF;
    text-align: center;
    text-transform: uppercase;
    margin: 2rem 0;
`;