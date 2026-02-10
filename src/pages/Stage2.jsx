
import { StateManagerContext } from '../context/StateContext';
import Student from '../components/Roles/Student';
import Teacher from '../components/Roles/Teacher';
import Professor from '../components/Roles/Professor';
import { useContext } from 'react';

const Stage2 = () => {
  const { role } = useContext(StateManagerContext);
  return (
    <>
      <h2 className="font-semibold mb-4 capitalize">
        Stage 2 / 3: Role-Specific Details ({role})
      </h2>

      {role === 'student' && <Student />}

      {role === 'teacher' && <Teacher />}

      {role === 'professor' && <Professor />}
    </>
  );
};

export default Stage2;
