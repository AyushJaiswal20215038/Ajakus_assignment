import React, { useEffect, useState } from "react";
import { api } from "../services/api";

function UserForm({ closeForm, user, formSubmit }) {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    company: {
      name: "",
    },
  });
  const [State, setState] = useState({
    Loading: false,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log({ name, value });
    if (name != "company_name") {
      setNewUser({ ...newUser, [`${name}`]: value });
    } else {
      setNewUser({ ...newUser, company: { name: value } });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setState({ Loading: true, error: null });
    try {
      if (user === null) {
        const response = await api.addUser(newUser);
        formSubmit(response);
      } else {
        const response = await api.updateUser(user.id, newUser);
        // console.log(response);
        formSubmit(response);
      }
      setState({ ...State, Loading: false });
      closeForm(false);
    } catch (error) {
      setState({ Loading: false, error: "API Error Occured" });
    }
  };
  useEffect(() => {
    if (user !== null) setNewUser(user);
  }, []);
  return (
    <>
      <div
        className="modal"
        style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">USER</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => closeForm()}
              ></button>
            </div>
            <div className="modal-body">
              <form className="needs-validation" novalidate>
                <div className="form-row">
                  <div className="col-md-4 mb-3 input-txt">
                    <label htmlFor="validationCustom01">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Name"
                      value={newUser.name}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3 input-txt">
                    <label htmlFor="validationCustom02">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email"
                      value={newUser.email}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                  <div className="col-md-4 mb-3 input-txt">
                    <label htmlFor="validationCustom02">Company Name</label>
                    <input
                      type="text"
                      name="company_name"
                      className="form-control"
                      placeholder="Company Name"
                      value={newUser.company.name}
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                </div>
                <button
                  className="btn btn-primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  {State.Loading ? "...Loading" : "Submit form"}
                </button>
                {State.error !== null ? `${State.error}` : ""}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserForm;
