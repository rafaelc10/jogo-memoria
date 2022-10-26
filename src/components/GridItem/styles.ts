import styled from "styled-components";

type ContainerProps = {
    showBackground: boolean;
}

type ImageProps = {
    opacity?: number;
}

export const Container = styled.div<ContainerProps>`
    background-color: ${props => props.showBackground ? '#101c40' : '#E2E3E3'};
    height: 100px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const Icon = styled.img<ImageProps>`
    width: 60px;
    height: 60px;
    opacity: ${props => props.opacity ?? '1'  /* <- Forma Simplificada props => props.opacity ? props.opacity : 1 */};
    filter: grayscale(1);
`;