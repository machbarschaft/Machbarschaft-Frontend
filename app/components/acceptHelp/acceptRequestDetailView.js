import React from 'react';
import { Button, Typography, message } from 'antd';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ArrowLeft from '../../assets/img/navigation/arrow-left.svg';
import { acceptOpenRequest, changeRequestStatus } from '../../utils/api/acceptHelpApi';
import AuthenticationContext from '../../contexts/authentication';
import { STATUS_WIP } from '../StatusSwitcher';

const { Text } = Typography;

export default function AcceptRequestDetailView({
  id,
  address,
  distance,
  closeDetailView,
  helpSeeker,
  requestText
}) {
  const [loadingState, setLoadingState] = React.useState(false);
  const history = useHistory();
  const authenticationContext = React.useContext(AuthenticationContext);

  const acceptRequest = async () => {
    setLoadingState(true);
    const helpRequest = {
      helpSeeker: {
        fullName: helpSeeker.fullName,
        phone: helpSeeker.phone
      },
      helper: authenticationContext.authenticationState.uid,
      requestStatus: STATUS_WIP,
      requestText
    };

    try {
      await acceptOpenRequest({ requestId: id, helpRequest });
      await changeRequestStatus({ requestId: id, status: { status: STATUS_WIP } })

      message.success('Auftrag erfolgreich angenommen!');
      setLoadingState(false);
      history.push('/dashboard');
    } catch (err) {
      message.error('Es ist ein Fehler aufgetreten!');
      setLoadingState(false);
    }
  };

  return (
    <div className="accept-help-request-detail">
      <div className="accept-help-request-detail-header">
        <div className="accept-help-request-detail-back">
          <img src={ArrowLeft} onClick={() => closeDetailView()} alt="" />
        </div>
        <div className="accept-help-request-detail-title">
          {address.street}, {address.zipCode} {address.city}
        </div>
      </div>
      <div className="accept-help-request-detail-main">
        <div className="accept-help-request-detail-info">
          <Text strong>Distanz:</Text>
          <div>
            {(distance / 1000).toFixed(1).replace('.', ',')}
            km
          </div>
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
  id: PropTypes.string,
  requestText: PropTypes.string,
  address: PropTypes.object.isRequired,
  helpSeeker: PropTypes.object.isRequired,
  distance: PropTypes.number.isRequired,
  closeDetailView: PropTypes.func.isRequired,
};
