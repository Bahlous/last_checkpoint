import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../JS/actions/cartActions";

const CardProd = ({ product, isProfile }) => {
  const dispatch = useDispatch();

  const [deleted, setDeleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [addingToCart, setAddingToCart] = useState(false); // optional loading state

  const handleDeleteClick = () => {
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    setDeleted(true);
    setShowConfirmModal(false);
  };

  const cancelDelete = () => {
    setShowConfirmModal(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    setEditedProduct({ ...editedProduct, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Product updated:", editedProduct);
  };

  const handleAddToCart = async () => {
    setAddingToCart(true);
    await dispatch(addToCart(product._id));
    setAddingToCart(false);
  };

  if (deleted) return null;

  return (
    <>
      <div className="card-prod">
        <img src={editedProduct.image} alt={editedProduct.name} width="150" />
        <div className="card-content">
          {isEditing ? (
            <>
              <Form.Control
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
                className="mb-2"
              />
              <Form.Control
                type="text"
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
                className="mb-2"
              />
              <Form.Control
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
                className="mb-2"
              />
              <Button variant="primary" onClick={handleSave} className="me-2">
                Save
              </Button>
              <Button variant="secondary" onClick={handleEditToggle}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <h4>{editedProduct.name}</h4>
              <p>{editedProduct.description}</p>
              <p>{editedProduct.price} DT</p>
              {isProfile ? (
                <>
                  <Button variant="danger" onClick={handleDeleteClick} className="me-2">
                    Delete
                  </Button>
                  <Button variant="success" onClick={handleEditToggle}>
                    Edit
                  </Button>
                </>
              ) : (
                <>
                  <Link to={`/prod/${product._id}`}>
                    <button className="me-2">Voir le produit</button>
                  </Link>
                  <Button
                    variant="warning"
                    onClick={handleAddToCart}
                    disabled={addingToCart}
                  >
                    {addingToCart ? "Ajout..." : "Ajouter au panier"}
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={cancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Es-tu sûr de vouloir supprimer ce produit ?</h3>
            <Button variant="danger" onClick={confirmDelete} className="me-2">
              Oui
            </Button>
            <Button variant="secondary" onClick={cancelDelete}>
              Non
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CardProd;
