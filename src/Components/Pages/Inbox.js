import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ComposeMail from './ComposeMail';

const Inbox = () => {
    const sentMail = localStorage.getItem('email').replace('.', '').replace('@', '');

    const [sentboxArr, setSentboxArr] = useState([]);
    const [loading, setIsLoading] = useState(false);
const [mail,setMail]=useState(false)


    useEffect(() => {
        setIsLoading(true);
    
        const FetchSentEmails = async () => {
          const response = await axios.get(`https://mail-box--inbox-default-rtdb.firebaseio.com/${sentMail}.json`);
    
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
      }, [sentMail]);
    

      const mailHandler=()=>{
        setMail(true)
      }

      const cancelHandler=()=>{
        setMail(false)
      }
      return (
        <div className="h-100 d-flex justify-content-center align-items-center">
        <Card className="w-75" style={{ background: 'transparent', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',color:'white' }}>
          <Card.Body>
            <Card.Title style={{ color: '#555555' }}>InBox</Card.Title>
            {loading && <p>...loading</p>}
            {!loading && (
              <>
                {sentboxArr.length === 0 ? (
                  <p>Inbox box is empty</p>
                ) : (
                  sentboxArr.map((email) => (
                    <div key={email.id} className="mb-3 pb-3 border-bottom">
                      <p className="mt-2">
                        <strong>mail from:</strong> {email.from}
                      </p>
                      <p>
                        <strong>Subject:</strong> {email.subject}
                      </p>
                      <Link to={`/inboxmessages/${email.id}`} className="text-decoration-none">
                        <Button variant="dark" style={{ background: 'purple' }}>View Message</Button>
                      </Link>
                    </div>
                  ))
                )}
              </>
            )}
          </Card.Body>
          
          <Card.Footer>
       {!mail && <Button variant="success" onClick={mailHandler}>Compose Mail</Button>} 
       {mail && <ComposeMail/>}
       {mail && <Button  variant='danger' className='m-2' onClick={cancelHandler}>Cancel</Button>}

          
          </Card.Footer>
        </Card>
      </div>  );
    };


export default Inbox