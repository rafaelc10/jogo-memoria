import styled from "styled-components";

export const Button = styled.button`
    width: 200px;
    height: 50px;
    display: flex;
    background-color: #101c40;
    border-radius: 10px;
    cursor: pointer;
    opacity: 1;
    transition: opacity ease 0.3s;
    border: none;

    &:hover{
        opacity: 0.8;
    }
`;
export const IconArea = styled.div`
    height: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    border-right: 1px solid rgba(255,255,255, 0.2);
    padding: 0 15px;
`;
export const Icon = styled.img`
    height: 20px;
`;

export const Label = styled.div`
    height: inherit;
    color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 0 20px;
`;