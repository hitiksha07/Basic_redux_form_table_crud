import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { editUserData, getUserValue } from '../../Redux/Action/UserAction';
import Swal from 'sweetalert2';
function RouteForm() {
    let state = useSelector(state => state.User.User);

    let dispatch = useDispatch();

    let blankObj = {
        id: 0, name: '', email: '', date: '', gender: '', hobby: [], file: '', Age: ''
    }
    const [obj, setobj] = useState({ ...blankObj });
    const [count, setcount] = useState(0);

    
    let { id } = useParams();    
    useEffect(() => {
        state?.forEach(x => {
            if (id == x.id) {
                console.log(x)
                setobj({ ...x })
            }
        })
    }, [id])


    const getValue = async (e) => {
        if (e.target.name == 'hobby') {
            if (e.target.checked) {
                obj.hobby = [...obj.hobby, ' ', e.target.value];
            }
            else {
                obj.hobby = obj.hobby.filter(x => x != e.target.value);
            }
        }
        else {
            obj[e.target.name] = e.target.value;
        }
        // console.log(obj);
        setobj({ ...obj })
    }

    const SaveData = () => {
        if (obj.id == 0) {
            let C = Math.floor(Math.random() * 10000);
            setcount(C);
            obj.id = C;
            dispatch(getUserValue(obj));
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
              })
        }
        else {
            let index = state.findIndex(x => x.id == obj.id);
            Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Save',
                denyButtonText: `Don't save`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    dispatch(editUserData(obj, index));
                    Swal.fire('Saved!', '', 'success')
                    window.location.reload()
                } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                }
            })
        }
        localStorage.setItem('count', JSON.stringify(count))
        setobj({...blankObj});
    }

    const clearAll = () => {
        localStorage.clear();
        window.location.reload()
    }


    return (
        <>
            <Container className='p-5'>
                <form action="">
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" name='name' id="name" placeholder="your name" value={obj.name} onChange={getValue} />
                        <label htmlFor="name">Your name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="email" className="form-control" name='email' id="floatingInput" placeholder="name@example.com" value={obj.email} onChange={getValue} />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="date" className="form-control" name='date' id="floatingdate" placeholder="date" value={obj.date} onChange={getValue} />
                        <label htmlFor="floatingdate">Birth-Date</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" name='Age' id="floatingAge" placeholder="Age" value={obj.Age} onChange={getValue} />
                        <label htmlFor="floatingAge">Age</label>
                    </div>
                    <div className="row mb-3">
                        <div className="col-1">
                            <label htmlFor="">Gender:</label>
                        </div>
                        <div className="col">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="Male" value="Male" checked={obj.gender?.includes("Male")} onChange={getValue} />
                                <label className="form-check-label" htmlFor="Male">Male</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="Female" value="Female" checked={obj.gender?.includes("Female")} onChange={getValue} />
                                <label className="form-check-label" htmlFor="Female">Female</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="gender" id="Other" value="Other" checked={obj.gender?.includes("Other")} onChange={getValue} />
                                <label className="form-check-label" htmlFor="Other">Other</label>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-1 ">
                            <label htmlFor="">Hobbies:</label>
                        </div>
                        <div className="col">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="Read" name='hobby' value="Read" checked={obj.hobby?.includes("Read")} onChange={getValue} />
                                <label className="form-check-label" htmlFor="Read">Read</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="Dance" name='hobby' value="Dance" checked={obj.hobby?.includes("Dance")} onChange={getValue} />
                                <label className="form-check-label" htmlFor="Dance">Dance</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="Sing" name='hobby' value="Sing" checked={obj.hobby?.includes("Sing")} onChange={getValue} />
                                <label className="form-check-label" htmlFor="Sing">Sing</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="checkbox" id="Travelling" name='hobby' value="Travelling" checked={obj.hobby?.includes("Travelling")} onChange={getValue} />
                                <label className="form-check-label" htmlFor="Travelling">Travelling</label>
                            </div>
                        </div>
                    </div>
                    <Link to='/table' type='button' className='btn btn-success' onClick={SaveData}>Submit</Link>
                    <button type='button' className='btn btn-danger ms-2' onClick={clearAll}>Clear All</button>
                </form>
            </Container>
        </>
    )
}

export default RouteForm