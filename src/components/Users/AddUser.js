import React, {  useRef, useState } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = (props) => {

  const [error, setError] = useState();
  const refUserName= useRef()
  const refAge=useRef()
  const refCollege=useRef()

  const addUserHandler = (event) => {
    event.preventDefault();
    console.log(refUserName.current.value)
    console.log(refAge.current.value)
    const userName=refUserName.current.value
    const Age=refAge.current.value
    const College=refCollege.current.value


    if (userName.trim().length === 0 || Age.trim().length === 0 || College.trim().length===0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name, age and college name (non-empty values).',
      });
      return;
    }
    if (+Age < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(userName, Age,College);

    refUserName.current.value=""
    refAge.current.value=""
    refCollege.current.value=""
  };




  const errorHandler = () => {
    setError(null);
  };

  return (
    <div>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            
            ref={refUserName}
           
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
           
            ref={refAge}
          />

          <label htmlFor="college">College Name</label>
          <input type="text" id="college" 
          ref={refCollege}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
