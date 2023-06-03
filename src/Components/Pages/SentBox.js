import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

const SentBox = () => {
  const [sentboxArr, setSentboxArr] = useState([]);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const FetchSentEmails = async () => {
      const sentMail = localStorage.getItem('email').replace('.', '').replace('@', '');
      const response = await axios.get(`https://mail-box-client-72574-default-rtdb.firebaseio.com/${sentMail}.json`);

      console.log(response);

      const data = response.data;
      const updatedSentboxArr = [];

      for (const key in data) {
        updatedSentboxArr.push({ id: key, ...data[key] });
      }

      setSentboxArr(updatedSentboxArr);
      setIsLoading(false);
    };

    FetchSentEmails();
  }, []);

  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Card className="w-75">
        <Card.Body>
          <Card.Title>Sent Box</Card.Title>
          {loading && <p>...loading</p>}
          {!loading && (
            <>
              {sentboxArr.length === 0 ? (
                <p>Sent box is empty</p>
              ) : (
                sentboxArr.map((email) => (
                  <div key={email.id}>
                    <p>ID: {email.id}</p>
                    <p>Message: {email.message}</p>
                    <p>Send To: {email.sendTo}</p>
                    <p>Subject: {email.subject}</p>
                  </div>
                ))
              )}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default SentBox;
