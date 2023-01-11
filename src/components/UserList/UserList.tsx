import React from 'react';

const UserList: React.FC = () => {
  return null;
  /*   const { users, error, loading } = useTypedSelector(s => s.users);
  const { fetchUsers } = useActions();
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  if (loading) {
    return <h1>Loading data...</h1>;
  }
  if (error) {
    return <h1>An error ocurred ({error})</h1>;
  }
  return (
    <div>
      {users.map(({ name }) => {
        return <div key={name}>{name}</div>;
      })}
    </div>
  ); */
};

export default UserList;
