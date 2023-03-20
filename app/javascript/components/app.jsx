import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const app = () => {
  const [memberState, setMemberState] = useState([]);
  const [memberInfo, setMemberInfo] = useState({name: '', age: 0});


  useEffect(() => {
    axios({
        method: 'GET',
        url: '/members'
    })
        .then(({data}) => {
            setMemberState(data);
        })
  }, []);

  const changeHandler = ({target}) => {
    setMemberInfo((prev) => ({...prev, [target.id]:target.value}));
  }

  const addMember = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: '/members',
      data: memberInfo
    })
        .then(({data}) => {
            setMemberState((prev) => {
                const newList = [...prev];
                newList.push(data);
                return newList;
            });
        })
  };

  const removeMember = (id, i) => {
    axios({
      method: 'DELETE',
      url: `/members/${id}`
    })
    .then(() => {
      setMemberState((prev) => {
        const newList = [...prev]
        newList.splice(i, 1);
        return newList;
      });
    })
  }
  
  const updateMember = (id, i) => {
    axios({
      method: 'PUT',
      url: `/members/${id}`,
      data: memberInfo
    })
    .then(({data}) => {
      setMemberState((prev) => {
        const newList = [...prev];
        newList[i] = data;
        return newList;
      })
    })
  }

  return (
    <div>
      <h1>These are our members</h1>
      {memberState.map((member, i)=>(
        <div key={member.id}>
          <p>{member.name} age: {member.age}</p>
          <p>{member.role}</p>
          <p>{member.bio}</p>
        </div>
      ))}

    <form>
        <label>Name:
            <input onChange={changeHandler} type="text" id="name" value={memberInfo.name}/>
        </label>
        <label>Age:
            <input onChange={changeHandler} type="number" id="age" value={memberInfo.age}/>
        </label>
        <button onClick={addMember}>Add Member</button>
        {memberState.map((member, i)=>(
            <div key={member.id}>
                <p>{member.name} age: {member.age}</p>
                <button onClick={()=>removeMember(member.id, i)}>Remove</button>
                <button onClick={()=>updateMember(member.id, i)}>Update</button>
            </div>
        ))}
    </form>
    </div>
  )
}
export default app;