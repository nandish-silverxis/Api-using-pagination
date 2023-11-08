import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ReactPaginate from 'react-paginate';


const baseUrl = "https://sbposbackend.onrender.com/api/v1";

function Userdata() {
  const [userdata, setUserdata] = useState([]);
  const [massage, setMassage] = useState("");
  const [page,setPage]=useState(1);
  const [lastpage,setlastPage]=useState(1);
  const [limit,setLimit]=useState(10);
  const [title,setTitle]=useState('')
  const navigate = useNavigate();

  useEffect(() => {
    getuserdata();
  }, [massage,title,limit]);

  async function getuserdata(pageno = 1)
   {

    
    const url = `${baseUrl}/get-posts`;
    const reqData = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({page: pageno, limit: limit, title : title})
    });

    

    const postdata = await reqData.json();
    setUserdata(postdata.data.data);
    setLimit(postdata.data.per_page);
    setlastPage(postdata.data.last_page);
    setPage(postdata.data.current_page);
  }
  const handeldelete = async (id) => {
    if(conf()) {
        // console.log(id);
    let res = await fetch("https://sbposbackend.onrender.com/api/v1/posts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
  
      let resjson = await res.json();
  
      if (resjson.status) {
        setMassage("user post deleted successfully");
  
        setTimeout(() => {
          navigate("/Userdata");
          setMassage("");
        }, 2000);
      } else {
        setMassage("please check Data");
      }
    }

    
  };
  function conf() {
    var ret = window.confirm("Do you want to Delete?");

    if (ret == true) {
      return true;
    } else {
      return false;
    }
  }

  const handlePageClick = (data) =>
  {
    getuserdata(data.selected+1)
  }

  const handeldchange = (data) =>
  {
     getuserdata(data.limit)
  }
 
   
  
 
  return (
    <div>


    

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="mt-2">Post List</h1>
            <p>{massage}</p>
            <form className="form-inline my-2 my-lg-0" >
      <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setTitle(e.target.value)} />
    </form>
            <div className="d-grid d-md-flex justify-content-md-end mb-3 my-4">
              <Link to="/Adduser" className="btn btn-warning">
                ADD New User
              </Link>
            </div>
            <div  style={{textAlign: "left",marginBottom: "110px"}}>
            <select onChange={(e) => setLimit(e.target.value)} style={{ 
              color: "red",
              backgroundColor: "white",
              padding: "10px",
              fontFamily: "Arial",
              textAlign: "left"
            }}>
            <option value=" " disabled hidden selected > 10 </option>
                  <option>25</option>
                  <option>50</option>
                  <option>100</option>
                  
                                </select>
                                </div>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Sr.no</th>
                  <th>Title</th>
                  <th>Body</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userdata.map((value, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{value.title}</td>
                    <td>{value.body}</td>
                    <td>
                      <Link
                        to={"/Edituser/" + value.id}
                        className="btn btn-success mx-2"
                        onClick={() => localStorage.setItem("id", i)}
                      >
                        Edit
                      </Link>
                      <Link
                        className="btn btn-danger"
                        onClick={() => handeldelete(value.id)}
                      >
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
           
            <ReactPaginate
                    containerClassName="pagination justify-content-center"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={limit}
                    pageCount={lastpage}
                    previousLabel="< previous"
                    breakClassName="page-item"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLinkClassName="page-link"
                    renderOnZeroPageCount={null}
                    activeClassName="active"
                  />


          </div>
        </div>
      </div>
    </div>
  )
  
}

export default Userdata;
