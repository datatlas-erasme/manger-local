import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { layerConfigChange } from 'erasme-kepler.gl/actions';
import classnames from 'classnames';
import { Override } from '../../../../types/Override';
import {
  Amap,
  FarmSale,
  MarketDealer,
  MarketProducer,
  ProducerShop,
  Solidarity
} from '../../../../assets/svg/types';
// import {FarmerIcon} from '../../../../assets/svg/FarmerIcon';
import { ButtonType } from './style';

export type ButtonProps = Override<
  React.ComponentPropsWithoutRef<'button'>,
  {
    text: string;
    bg?: string;
    textSize?: string;
    btnType?: 'parent' | 'child';
    listNames?: string[];
    idFilter?: string;
    layerId?: string | '';
    src?: string;
  }
>;

export default function ButtonSelect ({
  text,
  bg,
  textSize,
  btnType,
  listNames,
  idFilter,
  layerId,
  className,
  src,
  ...props
}: ButtonProps){

  console.log(layerConfigChange)

  console.log(text);
  
  const dispatch = useDispatch();  
  // Toggle the visibility of buttons parent list
  const [isActive, setIsActive] = useState(false);
  const isActiveState = () => {
    setIsActive(!isActive);
  };
  
  // Toggle the button linked layer vibility
  const [isLayerVisible, setIsLayerVisible] = useState(true);
  const isLayerVisibleState = () => {
    setIsLayerVisible(!isLayerVisible);
  };

    return (
      <ButtonType
        onClick={isActiveState}
        className={classnames('active', className, { selected: isActive })}
        {...props}>
          
        <div  className={ isActive ? 'active' : 'inactive' }>
          { text === 'Vente à la ferme' ? (
            <FarmSale/>
          ) : text === 'Magasin de producteurs' ? (
            <ProducerShop/>
          ) : text === 'AMAP/Panier' ? (
            <Amap/>
          ) : text === 'Distributeur automatique' ? (
            <MarketProducer/>
          ) : text === 'Epicerie sociale et solidaire' ? (
              <Solidarity/>
          ) : text === 'Distributeur automatique' ? (
                <MarketProducer/>
          ) : (<MarketDealer/>) }
        </div>
        
        <p>{text.substring(0, 30)}</p>
      </ButtonType>
    );
};