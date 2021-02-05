import React, { useState, useRef } from "react";
import axios from "axios";
import './Urlshortener.css'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Urlshortener= (props) => {
  const [url, setUrl] = useState();
  const [shortUrl, setShortUrl] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [errors, setErrors] = useState()
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  const style = {
    '@media (min-width: 500px)': {
        width: '450px',
    }
  };


  const handleSubmit = (e) => {
      e.preventDefault();
      setShortUrl("");
      setOriginalUrl(url)
      let validurl = ''
      if (url){
        if (!/^https?:\/\//i.test(url)) {
          validurl = `http://${url}`;
        } else {
          validurl = url;
        }
      }

      const URL = { longUrl: validurl };
      axios
        .post("/v1/shorturl", URL)
        .then(res => { console.log(res);
            const data = res.data;
            console.log(res.status);
            setShortUrl(data['shortUrl']);})
        .catch(err => setErrors(err.response.data));
      setUrl("");
  }

  const clearformhandler = (e) => {
    setUrl(e.target.value);
    setShortUrl("");
    setErrors("");
    setOriginalUrl("");
    setCopySuccess("");
  }

  const copyToClipboard = (e) => {
    textAreaRef.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopySuccess('Copied!');
  }


  return (
    <div style={style}>
    <h1 className="shorten">Shorten your URL!</h1>
    <Form inline>
      <Form.Group controlId="formInput" >
        <Form.Control type="text" placeholder="type URL to shorten"
              name="url" value={url}
              onChange={clearformhandler} />
        <Button variant="info" type="submit"
          onClick={handleSubmit}>Shorten</Button>
      </Form.Group>
    </Form>
    {errors && <Alert className="error" variant="danger">
          {errors}
        </Alert> }
        {shortUrl && <div className="success">
            <p>{originalUrl} has been shortened to:
              <div className="noborder"><textarea className="copy"
                ref={textAreaRef}
                value={shortUrl}
                onClick={copyToClipboard}/>
                {copySuccess}
              </div>
            </p>
        </div> }
    </div>
  );
}
export default Urlshortener;