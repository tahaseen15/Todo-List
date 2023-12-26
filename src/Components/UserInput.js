import React, { useEffect, useReducer, useState } from 'react';
import DisplayList from './DisplayList';

export default function UserInput() {



    const [itemKey, setItemkey] = useState('')
    const [itemValue, setItemvalue] = useState('')
    
    const [update, setUpdate] = useState(false);

    const onSaveLocal = ()=>{
        setItemkey("")
        setItemvalue("")
        setUpdate(p=>!p)
    }

    const setLocal = (e)=>{
       
        if(itemKey !='' && itemValue !='')
        {
            const check = localStorage.getItem(itemKey)

            if(check)
            {
                const decision = window.confirm("Item is already exists do u want to change its description")

                if(decision)
                {
                    localStorage.setItem(itemKey,"todo,"+itemValue)
                    onSaveLocal()
                }
            }
            else
            {
                localStorage.setItem(itemKey,"todo,"+itemValue)
                onSaveLocal()
            }

        }
        else
            alert("Fill the input boxes")
    }

    return (
        <>
            <div className='container d-flex justify-content-center mt-5'>
                <div className="input-group">
                    <input
                        type="text"
                        style={{ width: "300px" }}
                        className="form-control"
                        placeholder="Title"
                        aria-label="Username"
                        value={itemKey}
                        onChange={(e)=>setItemkey(e.target.value)}
                      
                    />
                    <input
                        type="text"
                        style={{ width: "300px" }}
                        className="form-control"
                        placeholder="Description"
                        aria-label="Server"
                        value={itemValue}
                        onChange={(e)=>setItemvalue(e.target.value)}
                    />
                    <button onClick={setLocal} className="btn btn-primary ml-2">ADD</button>
                </div>
            </div>
            <DisplayList upt={update} />

        </>
    );
}