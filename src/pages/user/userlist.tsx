import { useEffect, useState } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import axios from '../../api/axiosInstance';
import axiosInstance from '../../utils/axios';
import { AxiosInstance } from 'axios';
import { useAuthContext } from '../../auth/hooks';
import { useRouter } from '../../hooks/use-router';
 

type User = {
  id: string;
  name: string;
  email: string;
  status: string;
  role: string;
  positionId: string;
  Position: {
    name: string;
  };
};

export default function UserList() {
  // const router = useRouter();
  //   const { logout } = useAuthContext();
  //       void logout();
    
  //   router.push('/auth/login');

  // api: AxiosInstance = axiosInstance;
  const [users, setUsers] = useState<User[]>([]);

  
var accessToken ;

  const fetchUsers = async () => {
    const res = await axios.get('/user');
    setUsers(res.data.results);
    
 accessToken = sessionStorage.getItem('accessToken');
    
    console.log('Access Token:', accessToken);

  //   const res = await fetch('http://localhost:3100/user', {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  //   const data = await res.json();
  //   setUsers(data);
  // };

  // const fetchUsers = async () => {
  //   const token = localStorage.getItem('accessToken');
  //   const res = await fetch('http://localhost:3100/user', {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
    
    // const data = await res.json();
    // setUsers(data);
  };

  const deleteUser = async (id: string) => {
    await axios.delete(`http://localhost:3100/user/${id}`);
    fetchUsers();
  };

  useEffect(() => {
    
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <Link to="/add">Add New User</Link>
      token: {accessToken}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} ({user.email}) - {user.role} at {user.Position.name}
            <Link to={`/edit/${user.id}`}>Edit</Link>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}