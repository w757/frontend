import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function ProductDescription(props) {
  const [newComment, setNewComment] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [productInfo, setProductInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${props.id}`);
        if (response.ok) {
          const data = await response.json();
          setProductInfo(data);
        } else {
          throw new Error('Błąd pobierania danych produktu');
        }
      } catch (error) {
        console.error('Wystąpił błąd:', error);
      }
    };

    fetchData();
  }, [props.id]);

  const handleAddComment = async () => {
    if (!isLoggedIn) {
      alert("Musisz być zalogowany, aby dodać komentarz.");
      return;
    }
  
    if (!productInfo) {
      alert("Produkt nie został jeszcze załadowany. Proszę spróbować ponownie za chwilę.");
      return;
    }
  
    if (!productInfo.id) {
      alert("Nie można dodać komentarza, ponieważ produkt nie został znaleziony.");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/add_comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get("accessToken")}`
        },
        body: JSON.stringify({
          product_info_id: productInfo.id,
          text: newComment
        })
      });
  
      if (response.ok) {
        setNewComment("");
        const updatedProductInfo = { ...productInfo };
        updatedProductInfo.comments.push({ text: newComment, user_id: 'placeholder' });
        setProductInfo(updatedProductInfo);
      } else {
        const responseData = await response.json();
        alert(`Błąd: ${responseData.message}`);
      }
    } catch (error) {
      console.error('Wystąpił błąd:', error);
      //alert('Wystąpił błąd podczas dodawania komentarza.');
    }
  };
  
  

  const handleLoginRedirect = () => {
    navigate("/auth");
  };

  if (!productInfo) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h1>
        {productInfo.name}
      </h1>
      <h2>
        {productInfo.description}
      </h2>
      <h3>
        Opinie naszych użytkowników:
      </h3>
      {Array.isArray(productInfo.comments) && productInfo.comments.length > 0 ? (
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {productInfo.comments.map((comment, index) => (
            <li
              key={index}
              style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc" }}
            >
              <p>{comment.text}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak komentarzy.</p>
      )}

      {isLoggedIn ? (
        <div className="submit_form">
          <h2 className="form_title">Dodaj komentarz</h2>
          <Form className="between_fields_spacing">
            <Form.Group
              className="between_fields_spacing"
              controlId="newComment"
            >
              <Form.Label className="text-center">Twój komentarz:</Form.Label>
              <Form.Control
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Co sądzisz o tym produkcie?"
              />
            </Form.Group>

            <div className="centered">
              <Button
                variant="big_submit"
                size="lg"
                type="button"
                onClick={handleAddComment}
              >
                DODAJ
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <div className="submit_form">
          <h2 className="form_title">Zaloguj się aby dodać komentarz</h2>
          <Form className="between_fields_spacing">
            <div className="centered">
              <Button
                variant="big_submit"
                size="lg"
                type="button"
                onClick={handleLoginRedirect}
              >
                ZALOGUJ
              </Button>
            </div>
          </Form>
        </div>
      )}
    </>
  );
}
