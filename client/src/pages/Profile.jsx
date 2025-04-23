import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getMyProd } from "../JS/actions/productAction";
import ListProd from "../components/ListProd";
import "../App.css"; // pour le style

const Profile = () => {
  const user = useSelector((state) => state.authReducer.user);
  const myProduct = useSelector((state) => state.productReducer.myProduct);

  const [newprod, setNewprod] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setNewprod({ ...newprod, [e.target.name]: e.target.value });
  };

  const handleAddProd = (e) => {
    e.preventDefault();
    dispatch(addProduct(newprod));
    handleClose();
    setNewprod({
      title: "",
      description: "",
      price: "",
      image: "",
    });
  };

  useEffect(() => {
    dispatch(getMyProd());
  }, [dispatch]);

  return (
    <div className="page profile-page">
      <h3>{user.name && `Hello ${user.name}`}</h3>

      {/* Affichage des produits */}
      <ListProd products={myProduct} isProfile={true} />

      {/* Bouton en bas */}
      <div className="add-product-wrapper">
        <Button className="add-product-button" onClick={handleShow}>
          ➕ Add Product
        </Button>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product's name"
                name="title"
                value={newprod.title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product's description"
                name="description"
                value={newprod.description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Product's price"
                name="price"
                value={newprod.price}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image URL"
                name="image"
                value={newprod.image}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProd}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
