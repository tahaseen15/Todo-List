import React, { useEffect, useState } from 'react';

function DisplayList(props) {
  const [update, setUpdate] = useState(false);
  const [todo, setTodo] = useState([]);
  const [done, setDone] = useState([]);

  useEffect(() => {
    const fetchItems = () => {
      const todoItems = [];
      const doneItems = [];

      Object.keys(localStorage).forEach((key) => {
        const result = localStorage.getItem(key).split(',');
        if (result[0] === 'todo') todoItems.push(key);
        else doneItems.push(key);
      });

      setTodo(todoItems);
      setDone(doneItems);
    };

    fetchItems();
  }, [update, props.upt]);


  const LocalValues = ({ items, status }) => {

        const handleStatusChange = (key) => {
        if (status === 'todo') {
            statusChange(key,'done'); // Call statusChange only for 'todo' items
        }
        else
            statusChange(key,'todo')
        };

        const result = items.map((key) => (
        
            <div class="card mb-2">
                <div key={key}  class="card-body" >
                    <h5 class="card-title">{key}</h5>
                    <p class="card-text">{localStorage.getItem(key)}</p>            
                    
                    <button class="btn btn-primary me-2" onClick={() => {
                        localStorage.removeItem(key);
                        setUpdate((prev) => !prev);
                        }}>delete</button>

                    <button class="btn btn-primary" onClick={() => handleStatusChange(key)}>{status=="todo"? "done": "todo"}</button>
                </div> 
            </div>          

    ));

    return result;
  };


  const statusChange = (key,status) => {

        const tem_value = localStorage.getItem(key).split(',')
        const value = [status, tem_value[1]];
        localStorage.setItem(key, value);
        setUpdate(p=>!p)
  };

  return (

    <div class="row m-5">
        <div class="col-sm-6 mb-3 mb-sm-0">
            <h1>TODO</h1>
            <LocalValues items={todo} status='todo' />
        </div>
        <div class="col-sm-6">
            <h1>COMPLETED</h1>
            <LocalValues items={done} status='done' />
            
        </div>
    </div>  

  );
}

export default React.memo(DisplayList);
