import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteUserData } from '../../Redux/Action/UserAction';

function RouteTable() {
  let state = useSelector(state => state.User.User)
  const [search, setsearch] = useState('');
  const [filter1, setfilter1] = useState([]);

  useEffect(() => {
    let fill = state?.filter(x => {
      return x.name.toLowerCase().startsWith(search.toLowerCase());
    })
    setfilter1([...fill])
  }, [search]);

  let dispatch = useDispatch()

  function deleteData(i) {
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
        dispatch(deleteUserData(i));
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
          <input type="text" placeholder='Search Your Name' className='form-control w-25 p-2 fs-5 text-start' onChange={(e) => setsearch(e.target.value)} />
          <Link to='/form' className='btn btn-success text-end'>Add Data</Link>
        </div>
        <Table className='table-success table-striped table-hover my-5 fs-5 table-bordered text-center'>
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
              <td>Date</td>
              <td>Age</td>
              <td>Gender</td>
              <td>Hobbies</td>
              <td>Edit</td>
              <td>Delete</td>
            </tr>
          </thead>
          <tbody className='table-group-divider'>
            {
              search == '' ?
                <>
                  {
                    state?.map((x, i) => {
                      return (
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{x.name}</td>
                          <td>{x.email}</td>
                          <td>{x.date}</td>
                          <td>{x.Age}</td>
                          <td>{x.gender}</td>
                          <td>{x.hobby}</td>
                          <td>
                            <Link to={`/form/${x.id}`} className='btn btn-warning'>Edit</Link>
                          </td>
                          <td>
                            <button className='btn btn-danger' onClick={() => deleteData(i)}>Delete</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </> :
                <>
                  {
                    filter1?.map((x, i) => {
                      return (
                        <tr key={i}>
                          <td>{i+1}</td>
                          <td>{x.name}</td>
                          <td>{x.email}</td>
                          <td>{x.date}</td>
                          <td>{x.Age}</td>
                          <td>{x.gender}</td>
                          <td>{x.hobby}</td>
                          <td>
                            <Link to={`/form/${x.id}`} className='btn btn-warning'>Edit</Link>
                          </td>
                          <td>
                            <button className='btn btn-danger' onClick={() => deleteData(i)}>Delete</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </>
            }

          </tbody>
        </Table>
      </div>

    </>
  )
}

export default RouteTable