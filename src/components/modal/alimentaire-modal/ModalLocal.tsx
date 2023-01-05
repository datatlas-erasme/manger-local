import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import {
  FarmSale,
  ProducerShop,
  Amap,
  MarketProducer,
  Solidarity,
  MarketDealer,
} from '../../../assets/svg/types/index';
import PictoTime from '../../../assets/icon/icon-time.png';
import PictoPoi from '../../../assets/icon/icon-poi.png';
import PictoPen from '../../../assets/icon/icon-pen.png';
import { queryIcon } from '../../../utils/queryIcon';
import { OpeningHours } from '../../../utils/opening-hours';
import { translateDay } from '../../../utils/translateDay';
import {
  ModalColLeft,
  ModalColRight,
  ModalHeading,
  LabelRow,
  ProductRow,
  ProvenanceList,
  InfoPratique,
  BottomButton,
  TitleModal,
} from './style';

function MapModalLocal({ data, onClick }: any) {
  console.log('data', data);
  const openingDay = !!data[9] && data[9].map((item: any, i: number) => item);
  const shopIsOpen = OpeningHours(openingDay);
  const translateFR = translateDay(openingDay);

  return (
    <>
      <ModalHeading>
        <TitleModal>
          <span>
            {data[6] === 'AMAP' ? (
              <Amap />
            ) : data[6] === 'Magasin de producteurs' ? (
              <ProducerShop />
            ) : data[6] === 'Revendeur du marché (Achète des produits et les revend)' ? (
              <MarketDealer />
            ) : data[6] === 'Epicerie sociale et solidaire' ? (
              <Solidarity />
            ) : data[6] === 'Producteur du marché (Cultive ses produits et les vend)' ? (
              <MarketProducer />
            ) : data[6] === 'Vente à la ferme' ? (
              <FarmSale />
            ) : (
              ''
            )}
          </span>
          {!!data[0] && <h2>{data[2]}</h2>}
          <p>{data[6]} </p>
        </TitleModal>
        <div>
          <FontAwesomeIcon icon={faXmark} onClick={onClick} />
          <img
            alt={'Unsplash'}
            src={
              'https://images.unsplash.com/photo-1543083477-4f785aeafaa9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            }
          />
        </div>

        {!!data[14] ? (
          <a href={data[14]} target={'_blank'} rel={'noreferrer'}>
            <button>En savoir plus</button>
          </a>
        ) : (
          ''
        )}
      </ModalHeading>
      <ModalColLeft>
        <ProvenanceList>
          <h4>Provenance des produits</h4>
          <ul>
            <li>{data[11]}</li>
          </ul>
        </ProvenanceList>
        <InfoPratique>
          <li>
            <img src={PictoPoi} alt="icon poi" width={20} height={20} />
            <address>
              {data[3]}, {data[4]} - {data[5]}
            </address>
          </li>
          <li>
            <img src={PictoTime} alt="icon horloge" width={20} height={20} />
            {!!translateFR && translateFR ? (
              <ul>
                <li>{translateFR}</li>
              </ul>
            ) : (
              <p>Les horaires n'ont pas été renseigné</p>
            )}
            {shopIsOpen}
          </li>
        </InfoPratique>
      </ModalColLeft>

      <ModalColRight>
        <LabelRow>
          <h4>Labels & certifications</h4>
          {!!data[12] && data[12] ? (
            <ul>
              <li>{data[12]}</li>
            </ul>
          ) : (
            <p>{data[2]} ne propose pas encore de produits labelisés</p>
          )}
        </LabelRow>
        <ProductRow>
          <h4>Produits vendus</h4>
          <ul>
            {data[10] &&
              data[10].map((item: string, index: number) => {
                return (
                  <li key={index}>
                    <img src={queryIcon(item)} alt={item} />
                    <p>{item}</p>
                  </li>
                );
              })}
          </ul>
        </ProductRow>
      </ModalColRight>
      <BottomButton
        href={
          'https://demarches.guichet-recette.grandlyon.com/projets-de-crowdsourcing/ajouter-un-marchand/'
        }
        target="_blank"
        rel={'noreferrer'}
      >
        <button>
          <img src={PictoPen} alt="Icon Stylo" />
          <p>Modifier les informations</p>
        </button>
      </BottomButton>
    </>
  );
}
const mapStateToProps = (state: any) => state;
const dispatchToProps = (dispatch: any) => ({ dispatch });

export default connect(mapStateToProps, dispatchToProps)(MapModalLocal);
