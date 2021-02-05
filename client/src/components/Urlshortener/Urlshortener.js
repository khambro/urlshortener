import React, { useState } from "react";
import axios from "axios";
import './Urlshortener.css'


const Urlshortener= (props) => {
  const [url, setUrl] = useState();
  const [shortUrl, setShortUrl] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [errors, setErrors] = useState()

  const style = {
    '@media (min-width: 500px)': {
        width: '450px',
    }
  };


  const handleSubmit = (e) => {
      e.preventDefault();
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
  }


  return (
    <div style={style}>
    <form className="noborder">
        <input id="urlinput" type="text" placeholder="type URL to shorten"
          name="url" value={url}
          onChange={clearformhandler}/>
        <input id="shorten_btn" type="submit" value="Shorten" onClick={handleSubmit} />
        {errors && <div className='errors'>
            <p>{errors}</p>
        </div> }
        {shortUrl && <div className="success">
            <p>{originalUrl} has been shortened to <a className="copy"href={shortUrl}>{shortUrl}</a></p>
        </div> }
    </form>
    </div>
  );
}

export default Urlshortener;