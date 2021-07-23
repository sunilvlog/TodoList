import React, { useState , useEffect} from 'react';
import Users from './Users';

// for save in localstorage
const getlocalitems = () => {
    let list = localStorage.getItem('lists');
    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return [];
    }
}
// add a new item....when clicked + button
function Todolist(props) {
    const [input, setinput] = useState("")
    const [item, setitem] = useState(getlocalitems())
    const [ToggleData,SetToggleData] = useState(true)
    const [IsEditItem, SetIsEditItem] = useState(null)
    const Todoitem = () => {
            if (!input) {
                alert("please fill the data")
    
            }else if(input && !ToggleData) {
                setitem(item.map((Elem) => {
                    if (Elem.id === IsEditItem) {
                        return {...Elem, name:input}
                    }
                    return Elem
                }))
                SetToggleData(true)
                setinput("")
                SetIsEditItem(null)
            
            }else {
                const AllInputData = {id: new Date().getTime().toString(), name:input}
                setitem([...item, AllInputData])
                setinput("")
            }
    }
    
    // add a new item....when press enter key
    const IsEnterTodoitem = (e) => {
        if (e.key === 'Enter') {
            if (!input) {
                alert("please fill the data")
    
            }else if(input && !ToggleData) {
                setitem(item.map((Elem) => {
                    if (Elem.id === IsEditItem) {
                        return {...Elem, name:input}
                    }
                    return Elem
                }))
                SetToggleData(true)
                setinput("")
                SetIsEditItem(null)
            
            }else {
                const AllInputData = {id: new Date().getTime().toString(), name:input}
                setitem([...item, AllInputData])
                setinput("")
            }
        }
    }
    // for items deleted
    const Deletebtn = (index) => {
        const updatedata = item.filter((arrelement) => {
                return index !== arrelement.id;
            });
            setitem(updatedata)
    }
    // for edit item
    const EditBtn =(id) => {
        const editdata = item.find((elem) => {
            return elem.id===id;
        })
        SetToggleData(false)
        setinput(editdata.name)
        SetIsEditItem(id)
    }
    // set the localstorage
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(item))
    }, [item])

    return (
        <>
        <div className='App-header text-center shadow'>
            <br />
            <h1 className="text-center bg-primary">Todo List</h1>
            <br />
            <input className='form-control mt-10' id='todoinput' type='text' placeholder='Enter a Item' value={input} onChange={e => setinput(e.target.value)} onKeyDown={IsEnterTodoitem} />
            {
                ToggleData ? <button className='btn btn-primary' id='todoid' onClick={Todoitem}> + </button>
                : <img className='bi bi-pencil' src={props.edit} alt="edit" onClick={Todoitem} />

            }
            <ol className='mt-5'>
                {item.map((todolists) => {
                    return (
                        <div className='d-flex' key={todolists.id}>
                            <span className="btn-close" disabled aria-label="Close" title='Delete' onClick={() => {Deletebtn(todolists.id)}}></span>
                            <img className='bi bi-pencil' src={props.edit} alt="edit" title='Edit' onClick={() => {EditBtn(todolists.id)}} />
                            <li> {todolists.name}</li>
                        </div>
                    )
                })}
            </ol>
            <Users />
            <br />
            <button className='btn btn-warning mb-3'>Api Data</button>
        </div>
        
        </>
    )
}

export default Todolist
