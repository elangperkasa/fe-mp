import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserForm, { UserFormData } from '../../components/UserForm';

export default function UserAdd() {
  const navigate = useNavigate();

  const handleSubmit = async (data: UserFormData) => {
    await axios.post('http://localhost:3100/user', data);
    navigate('/');
  };

  return (
    <div>
      <h1>Add User</h1>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}