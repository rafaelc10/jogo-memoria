import { useState, useEffect } from 'react';
import * as C from './App.styles'

import LogoImg from './assets/batmemory_logo.png'
import RestartIcon from './svgs/restart.svg';

import { GridItemType } from './types/GridItemType';
import { items } from './data/items'
import { formatTimeElapsed } from './helpers/formatTimeElapsed';

import { Button } from './components/button';
import { InfoItem } from './components/InfoItem';
import { GridItem } from './components/GridItem';

const App = () => {

  const [playing, setPlaying] = useState<boolean>(false);
  const [timeElapsed, setTimeElapsed] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), [])

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      playing ? setTimeElapsed(timeElapsed + 1) : '';
    }, 1000);
    return () => clearInterval(timer);
  }, [playing, timeElapsed])

  // Verificação das imagens iguais.
  useEffect(() => {
    if (shownCount === 2) {
      let opened = gridItems.filter((item) => item.shown === true);
      if (opened.length === 2) {
        if (opened[0].item === opened[1].item) {
          // Verificação 1 - Se são iguais trocar o shown para permanentShown
          let cloneGrid = [...gridItems];
          for (let i in cloneGrid) {
            if (cloneGrid[i].shown) {
              cloneGrid[i].permanentShown = true;
              cloneGrid[i].shown = false;
            }
          }
          setGridItems(cloneGrid);
          setShownCount(0)
        } else {
          // Verificação 2 -Se não forem iguais trocar o shown para false novamente
          setTimeout(() => {
            let cloneGrid = [...gridItems];
            for (let i in cloneGrid) {
              cloneGrid[i].shown = false;
            }
            setGridItems(cloneGrid);
            setShownCount(0)
          }, 1000)
        }

        setMoveCount(moveCount => moveCount + 1);
      }

    }
  }, [shownCount, gridItems])

  // Verificar quando o jogo acabar
  useEffect(()=>{
    if(moveCount > 0 && gridItems.every((item) => item.permanentShown === true)){
      alert('Parabéns você venceu!');
      setPlaying(false);
      
    }
  }, [moveCount]);

  const resetAndCreateGrid = () => {
    // 1 - Resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    // 2 - Criar o grid vazio
    let gridArray: GridItemType[] = [];
    for (let i = 0; i < (items.length * 2); i++) {
      gridArray.push({
        item: null,
        shown: false,
        permanentShown: false
      })
    }
    // 2.1 - Preencher o Grid
    for (let w = 0; w < 2; w++) {
      for (let i = 0; i < items.length; i++) {
        let pos = -1;
        while (pos < 0 || gridArray[pos].item !== null) {
          pos = Math.floor(Math.random() * items.length * 2);
        }
        gridArray[pos].item = i;
      }
    }
    // 2.2 - Jogar no state
    setGridItems(gridArray);

    // 3 -  Começar o jogo
     setPlaying(true);
  }

  const handleItemClick = (index: number) => {
    if (playing && index !== null && shownCount < 2) {
      let cloneGrid = [...gridItems];
      if (cloneGrid[index].permanentShown === false && cloneGrid[index].shown === false) {
        cloneGrid[index].shown = true;
        setShownCount(shownCount + 1);
      }
      setGridItems(cloneGrid);
    }
  }

  return (
    <div>
      <C.Container>
        <C.Info>
          <C.LogoLink href="">
            <img src={LogoImg} width="200" alt='' />
          </C.LogoLink>

          <C.InfoArea>
            <InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)} />
            <InfoItem label='Movimentos' value={moveCount.toString()} />
          </C.InfoArea>

          <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid} />
          <C.Credits>Desenvolvido por <C.CreditsA target='_blank' href="https://github.com/rafaelc10">Rafael Coppini</C.CreditsA></C.Credits>

        </C.Info>
        <C.GridArea>
          <C.Grid>
            {gridItems.map((item, index) => (
              <GridItem
                key={index}
                item={item}
                onClick={() => handleItemClick(index)}
              />
            ))}
          </C.Grid>
        </C.GridArea>
      </C.Container>
    </div>
  );
}

export default App;