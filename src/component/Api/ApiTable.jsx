import React from 'react'
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { deleteApiData, getApidata } from '../../Redux/Action/ApiAction';
import Swal from 'sweetalert2';

function ApiTable() {
    let state = useSelector(state => state.Success.Success);
    console.log(state)
    let dispatch = useDispatch()
    const deleteData = (i) => {
            Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteApiData(i));
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }
    return (
        <>
            <div className="container py-5">
                <div className="d-flex justify-content-between">
                    <Link to='/apiForm' className='btn btn-success text-end'>Add Data</Link>
                </div>
                <Table className='table table-striped table-hover my-5 fs-5 table-bordered text-center'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>userID</td>
                            <td>Title</td>
                            <td>Body</td>
                            <td>Edit</td>
                            <td>Delete</td>
                        </tr>
                    </thead>
                    <tbody className='table-group-divider'>
                        {
                            state?.map((x, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{x.userId}</td>
                                        <td>{x.title}</td>
                                        <td>{x.body}</td>
                                        <td>
                                            <Link to={`/apiForm/${x.id}`} className='btn btn-warning'>Edit</Link>
                                        </td>
                                        <td>
                                            <button className='btn btn-danger' onClick={() => deleteData(x.id)}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default ApiTable