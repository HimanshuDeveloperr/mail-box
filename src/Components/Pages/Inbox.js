

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ComposeMail from './ComposeMail';
import { useDispatch, useSelector } from 'react-redux';
import { ClassActions } from '../Store/ClassSlice';

const Inbox = () => {
  const sentMail = localStorage.getItem('email').replace('.', '').replace('@', '');

  const [sentboxArr, setSentboxArr] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [mail, setMail] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.class.class);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://mail-box--inbox-default-rtdb.firebaseio.com/${sentMail}.json`);

        const data = response.data;
        const updatedSentboxArr = [];

        for (const key in data) {
          updatedSentboxArr.push({ id: key, ...data[key] });
        }

        setSentboxArr(updatedSentboxArr);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    const interval = setInterval(() => {
      fetchData();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, [sentMail]);

  useEffect(() => {
    let count = 0;

    sentboxArr.forEach((email) => {
      if (!classes) {
        count++;
      }
    });

    setUnreadCount(count);
  }, [sentboxArr, classes]);

  const mailHandler = () => {
    setMail(true);
  };

  const cancelHandler = () => {
    setMail(false);
  };

  const readHandler = () => {
    dispatch(ClassActions.classHandler());
  };

  const deleteHandler = async (id) => {
    await axios.delete(`https://mail-box--inbox-default-rtdb.firebaseio.com/${sentMail}/${id}.json`);

    const updatedSentboxArr = sentboxArr.filter((email) => email.id !== id);
    setSentboxArr(updatedSentboxArr);

    if (!classes) {
      setUnreadCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Card className="w-75" style={{ background: 'transparent', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', color: 'white' }}>
        <Card.Body>
          <Card.Title style={{ color: '#555555' }} className="border-bottom">
            InBox
          </Card.Title>
          {loading && <p>...loading</p>}
          {!loading && (
            <>
              {sentboxArr.length === 0 ? (
                <p>Inbox box is empty</p>
              ) : (
                sentboxArr.map((email) => (
                  <div key={email.id} className="mb-3 pb-3 border-bottom">
                    <p className="mt-2">
                      {classes ? <span className="text-info">--</span> : <span className="text-danger">--</span>}
                      <strong>mail from:</strong> {email.from}
                    </p>
                    <p>
                      <strong>Subject:</strong> {email.subject}
                    </p>
                    <Link to={`/inboxmessages/${email.id}`} className="text-decoration-none">
                      <Button variant="outline-info" onClick={readHandler}>
                        View Message
                      </Button>
                    </Link>
                    <Button variant="outline-danger" className="mx-2" onClick={() => deleteHandler(email.id)}>
                      Delete
                    </Button>
                  </div>
                ))
              )}
            </>
          )}
        </Card.Body>

        <Card.Footer>
          {!mail && <Button variant="outline-success" onClick={mailHandler}>Compose Mail</Button>}
          {mail && <ComposeMail />}
          {mail && <Button variant="danger" className="m-2" onClick={cancelHandler}>Cancel</Button>}
          <p className="text-muted text-white-50">Unread Emails: {unreadCount}</p>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Inbox;

