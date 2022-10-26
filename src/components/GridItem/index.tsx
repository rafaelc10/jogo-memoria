import { GridItemType } from '../../types/GridItemType';
import * as C from './styles';
import riddler from '../../assets/riddler.png'
import { items } from '../../data/items';

type Props = {
    item: GridItemType,
    onClick: () => void; 
}

export const GridItem = ({item, onClick}: Props) => {
    return (
        <C.Container onClick={onClick} showBackground={item.permanentShown || item.shown}>
            {item.permanentShown === false && item.shown === false && 
                <C.Icon src={riddler} alt="" opacity={.1} />
            }
            {(item.permanentShown || item.shown) && item.item !== null &&
                <C.Icon src={items[item.item].icon} alt="" />
            }
        </C.Container>
    );
}