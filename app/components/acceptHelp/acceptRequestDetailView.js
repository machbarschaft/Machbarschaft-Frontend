import React from 'react';
import { Button, Typography, message } from 'antd';
import PropTypes from 'prop-types';
import ArrowLeft from '../../assets/img/navigation/arrow-left.svg';
import RequestTypeOther from '../../assets/img/request-category/request-category-other.svg';
import RequestTypeGroceries from '../../assets/img/request-category/request-category-groceries.svg';
import RequestTypeMedication from '../../assets/img/request-category/request-category-medication.svg';
import CarRequired from '../../assets/img/request-requirements/car-required.svg';
import CarNotRequired from '../../assets/img/request-requirements/car-not-required.svg';
import PrescriptionRequired from '../../assets/img/request-requirements/prescription-required.svg';
import PrescriptionNotRequired from '../../assets/img/request-requirements/prescription-not-required.svg';
import { acceptOpenRequest } from '../../utils/api/acceptHelpApi';
import { useHistory } from 'react-router-dom';

const { Text } = Typography;

export default function AcceptRequestDetailView({
  process,
  requestType,
  address,
  urgency,
  distance,
  extras,
  closeDetailView,
}) {
  let categoryTitle = '';
  const urgencyMapping = {
    now: 'dringend',
    today: 'heute',
    tomorrow: 'morgen',
    'this-week': 'diese Woche',
  };
  if (requestType.length == 0)
    categoryTitle = 'Keine Kategorie angegeben';
  else categoryTitle = 'Kategorie: ';

  const [loadingState, setLoadingState] = React.useState(false);
  const history = useHistory();
  const acceptRequest = () => {
    setLoadingState(true);
    acceptOpenRequest({requestId: process})
      .then(() => {
        message.success('Auftrag erfolgreich angenommen!');
        setLoadingState(false);
        history.push('/dashboard');
      })
      .catch((err) => {
        console.log("error: ", err);
        message.error('Es ist ein Fehler aufgetreten!'); // ToDo: more details
        setLoadingState(false);
      })
  };

  return (
    <div className="accept-help-request-detail">
      <div className="accept-help-request-detail-header">
        <div className="accept-help-request-detail-back">
          <img src={ArrowLeft} onClick={() => closeDetailView()} />
        </div>
        <div className="accept-help-request-detail-title">
          {address.street}, {address.zipCode}{' '}
          {address.city}
        </div>
      </div>
      <div className="accept-help-request-detail-main">
        <div className="accept-help-request-detail-info">
          <Text strong>{categoryTitle}</Text>
          <div className="display-flex">
            {requestType == 'groceries' && (
              <img
                className="accept-help-request-detail-icon"
                src={RequestTypeGroceries}
              />
            )}
            {requestType == 'medication' && (
              <img
                className="accept-help-request-detail-icon"
                src={RequestTypeMedication}
              />
            )}
            {requestType == 'other' && (
              <img
                className="accept-help-request-detail-icon"
                src={RequestTypeOther}
              />
            )}
          </div>
          <Text strong>Distanz:</Text>
          <div>{(distance/1000).toFixed(1).replace('.', ',')}km</div>
          <Text strong>Dringlichkeit:</Text>
          <div>
            {urgency in urgencyMapping
              ? urgencyMapping[urgency]
              : 'unbekannt'}
          </div>
          <Text strong>Auto benötigt:</Text>
          <img
            className="accept-help-request-detail-icon"
            src={extras.carNecessary ? CarRequired : CarNotRequired}
          />
          <Text strong>Rezept benötigt:</Text>
          <img
            className="accept-help-request-detail-icon"
            src={
              extras.prescriptionRequired
                ? PrescriptionRequired
                : PrescriptionNotRequired
            }
          />
        </div>
      </div>
      <div className="horizontal-center">
        <Button
          className="accept-help-request-detail-button"
          type="primary"
          onClick={() => acceptRequest()}
          loading={loadingState}
        >
          Auftrag annehmen
        </Button>
      </div>
    </div>
  );
}
AcceptRequestDetailView.propTypes = {
  process: PropTypes.string,
  requestType: PropTypes.oneOf(['groceries', 'medication', 'other']).isRequired,
  address: PropTypes.object.isRequired,
  urgency: PropTypes.oneOf(['now', 'today', 'tomorrow', 'this-week']).isRequired,
  distance: PropTypes.number.isRequired,
  extras: PropTypes.object.isRequired,
  closeDetailView: PropTypes.func.isRequired,
};
