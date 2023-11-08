import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Edituser() {
  const { id } = useParams();
  const [userId, setUserId] = useState(-1)
  const [edituser, setEdituser] = useState({ title: "", body: "" });
  const navigate = useNavigate();
  const [massage, setMassage] = useState("");

  useEffect(() => {
    getuser();
    setUserId(localStorage.getItem("id"))
  }, []);

  const getuser = async () => {
    const reqdata = await fetch(
      "https://sbposbackend.onrender.com/api/v1/get-posts/",
      {
        method: "POST",
        body: JSON.stringify({ id: id}),
        headers: { "content-type": "application/json" },
      }
    );
    const resData = await reqdata.json();
    setEdituser(resData.data);
  };

  const handleinput = (e) => {
    setEdituser({ ...edituser, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const editinputvalue = {
      title: edituser.title,
      body: edituser.body,
      id: id,
    };
    console.log(editinputvalue);
    let res = await fetch("https://sbposbackend.onrender.com/api/v1/posts/", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(editinputvalue),
    });

    let resjson = await res.json();

    if (res.status === 200) {
      setMassage("user is updated successfully");
      setTimeout(() => {
        navigate("/Userdata");
      }, 1000);
    } else {
      setMassage("some error occured");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h5 className="mt-2">edit user {parseInt(userId) + 1}</h5>
            <p className="text-success">{massage}</p>
            <form onSubmit={handlesubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-6>">
                    <label className="form-label">title:</label>
                    <input
                      type="text"
                      name="title"
                      className="form-control/"
                      value={edituser.title}
                      onChange={handleinput}
                    />
                    <br></br>
                    <br></br>
                    <label className="form-label">body:</label>
                    <input
                      type="text"
                      name="body"
                      className="form-control/"
                      value={edituser.body}
                      onChange={handleinput}
                    />
                  </div>
                </div>

                <div >
                  <div className="mb-3>">
                    <button name="submit" className="btn btn-success btn-sm">
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edituser;
