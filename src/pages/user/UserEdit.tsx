import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserForm, { UserFormData } from '../../components/UserForm';

export default function UserEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserFormData | null>(null);

  useEffect(() => {
    axios.get(`http://localhost:3100/user`).then(res => {
      const u = res.data.results.find((usr: any) => usr.id === id);
      if (u) {
        setUser({
          name: u.name,
          email: u.email,
          role: u.role,
          positionId: u.positionId,
          webAuthnId: '', // Set from server if available
        });
      }
    });
  }, [id]);

  const handleSubmit = async (data: UserFormData) => {
    await axios.patch(`http://localhost:3100/user/${id}`, data);
    navigate('/');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit User</h1>
      <UserForm onSubmit={handleSubmit} initialData={user} />
    </div>
  );
}