import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import AuthenticationContext from '../../contexts/authentication';
import useDashboard from '../../hooks/useDashboard';
import { updateUserRole } from '../../utils/api/userApi';
import roles from '../../utils/constants/roles';

export default function AdminDashboard() {
  const [requestsState, {fetchAdmins}] = useDashboard('helper');
  const history = useHistory();
  const authenticationContext = React.useContext(AuthenticationContext);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const editAdmin = (id) => {
    history.push(`/admin/${id}`);
  };

  const removeAdmin = async (email) => {
    Modal.confirm({
      title: 'Warnung',
      onOk: async () => {
        authenticationContext.startLoading();
        await updateUserRole(email, roles.USER);
        authenticationContext.finishLoading();
        fetchAdmins();
      },
      content: 'Möchten Sie diesen Administrator entfernen?',
      okText: 'Ja',
      cancelText: 'Nein',
    });
  };

  return (
    <div className="content-container-default background-light-grey">
      <table className="full-width-table">
        <thead>
        <tr>
          <th>Vorname</th>
          <th>Nachname</th>
          <th>Email</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {
          requestsState?.adminsResult?.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.firstName}</td>
              <td>{admin.lastName}</td>
              <td>{admin.email}</td>
              <td className="table-actions">
                <span onClick={() => editAdmin(admin.id)}><EditFilled/></span>
                <span style={{color: '#eb0c0c'}} onClick={() => removeAdmin(admin.email)}><DeleteFilled/></span>
              </td>
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
}
