import React, { useEffect, useState } from 'react'
import { Button, Container, Modal, Table } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
// import Swal from 'sweetalert2/src/sweetalert2.js'
import Swal from 'sweetalert2'

//---------all crud in one page--------
function Form() {
  const [array, setarray] = useState(JSON.parse(localStorage.getItem('array')) || []);
  let blankObj = {
    id: 0, name: '', email: '', password: '', date: '', gender: '', hobby: [], file: '', Age: ''
  }
  const [obj, setobj] = useState({ ...blankObj });
  const [count, setcount] = useState(JSON.parse(localStorage.getItem('count')) || 0);
  const [show, setShow] = useState(false);
  const [search, setsearch] = useState('');
  const [filter1, setfilter1] = useState([]);


  const handleClose = () => setShow(false);
  const handleShow = (x) => {
    setShow(true);
    setobj({ ...x })
  };

  const getValue = async (e) => {
    if (e.target.name == 'hobby') {
      if (e.target.checked) {
        obj.hobby = [...obj.hobby, ' ', e.target.value];
      }
      else {
        obj.hobby = obj.hobby.filter(x => x != e.target.value);
      }
    }
    else if (e.target.name == 'file') {
      let file = e.target.files[0];
      obj.file = file ? await toBase64(file) : '';
    }
    else {
      obj[e.target.name] = e.target.value;
    }
    // console.log(obj);
    setobj({ ...obj })
  }
  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const SaveData = () => {
    if (obj.id == 0) {
      let count1 = count + 1;
      setcount(count1);
      obj.id = count1;
      array.push(obj);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      let index = array.findIndex(x => x.id == obj.id);
      // array.splice(index, 1, obj);

      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          array.splice(index, 1, obj);
          setarray([...array]);
          localStorage.setItem('array', JSON.stringify(array))
          localStorage.setItem('count', JSON.stringify(count))
          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }
    setarray([...array]);
    localStorage.setItem('array', JSON.stringify(array))
    localStorage.setItem('count', JSON.stringify(count))
    setobj({ ...blankObj });
    console.log(array);
    setShow(false)
  }
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
        array.splice(i, 1)
        localStorage.setItem('array', JSON.stringify(array))
        setarray([...array])
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })

  }
  const clearAll = () => {
    localStorage.clear();
    window.location.reload()
  }

  console.log(search)
  useEffect(() => {
    let fill = array?.filter(x => {
      return x.name.toLowerCase().startsWith(search.toLowerCase());
    })
    setfilter1([...fill])
  }, [search])
  return (
    <>
      <Accordion defaultActiveKey="0" className='container fs-5'>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Add New Data</Accordion.Header>
          <Accordion.Body>
            <Container>
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
                <div className="mb-3">
                  <input className="form-control" type="file" name='file' id="formFile" onChange={getValue} />
                </div>
                <button type='button' className='btn btn-success' onClick={SaveData}>Submit</button>
                <button type='button' className='btn btn-danger ms-2' onClick={clearAll}>Clear All</button>
              </form>
            </Container>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <div className="container mt-5">
        <input type="text" placeholder='Search Your Name' className='form-control w-25 p-2 fs-5' onChange={(e) => setsearch(e.target.value)} />
        <Table className='table-success table-striped table-hover my-5 fs-5 table-bordered text-center'>
          <thead>
            <tr>
              <td>ID</td>
              <td>Profile</td>
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
                    array?.map((x, i) => {
                      return (
                        <tr key={i}>
                          <td>{x.id}</td>
                          <td><img src={x.file} alt="" width='100px' /></td>
                          <td>{x.name}</td>
                          <td>{x.email}</td>
                          <td>{x.date}</td>
                          <td>{x.Age}</td>
                          <td>{x.gender}</td>
                          <td>{x.hobby}</td>
                          <td>
                            <button className='btn btn-warning' onClick={() => handleShow(x)} >Edit</button>
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
                          <td>{x.id}</td>
                          <td><img src={x.file} alt="" width='100px' /></td>
                          <td>{x.name}</td>
                          <td>{x.email}</td>
                          <td>{x.date}</td>
                          <td>{x.Age}</td>
                          <td>{x.gender}</td>
                          <td>{x.hobby}</td>
                          <td>
                            <button className='btn btn-warning' onClick={() => handleShow(x)} >Edit</button>
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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              <div className="col-2">
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
              <div className="col-2">
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
            <div className="mb-3">
              <input className="form-control" type="file" name='file' id="formFile" onChange={getValue} />
            </div>
            <button type='button' className='btn btn-success' onClick={SaveData}>Submit</button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Form