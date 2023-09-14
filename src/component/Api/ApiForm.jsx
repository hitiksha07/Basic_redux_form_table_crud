import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addApiData, editApidata, getApidata } from '../../Redux/Action/ApiAction';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';

function ApiForm() {
    let blankObj = {
        id: 0, userId: 0, title: '', body: ''
    }
    const [obj, setobj] = useState({ ...blankObj });
    const [count, setcount] = useState(0)
    const [user, setuser] = useState(0)
    let state = useSelector(state => state.Success.Success);
    let dispatch = useDispatch()

    let { id } = useParams();
    useEffect(() => {
        state?.map((x, i) => {
            if (x.id == id) {
                setobj({ ...x })
            }
        })
    }, [id])

    //    console.log(state)
    const getvalue = (e) => {
        obj[e.target.name] = e.target.value
        // console.log(obj)
        setobj({ ...obj })
    }

    const saveData = () => {
        if (obj.id == 0) {
            let c = uuidv4()
            console.log(c)
            setcount(c);
            obj.id = c;
            let userid = Math.floor(Math.random() * 10000);
            setuser(userid);
            obj.userId = userid;
            dispatch(addApiData(obj));
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            })
        }
        else {
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
            }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    dispatch(editApidata(obj))
                    Swal.fire('Saved!', '', 'success')
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
        }
        setobj({ ...blankObj })
    }
    return (
        <>
            <Link to='/apiTable' >Table</Link>
            <Container className='p-5 text-bg-dark rounded-4 '>
                <form action="">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">title</label>
                        <input type="text" className="form-control" id="title" placeholder="title" name='title' value={obj.title} onChange={getvalue} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Body</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" name='body' value={obj.body} onChange={getvalue}></textarea>
                    </div>
                    <Link to='/apiTable' type='button' className='btn btn-success' onClick={saveData}>Submit</Link>
                </form>
            </Container>
        </>
    )
}

export default ApiForm