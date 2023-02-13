import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './APOD.css';


const apiKey = process.env.REACT_APP_NASA_KEY;

// const DatePicker = () => {
//     const [date, setDate] = useState('');
//     const dateInputRef = useRef(null);

//     const handleChange = (e) => {
//         setDate(e.target.value);
//         fetchPhotoByDate(date);
//     };

//     return (
//         <div>
//             <input
//                 type="date"
//                 onChange={handleChange}
//                 ref={dateInputRef}
//             />
//             <p>Selected Date: {date}</p>
//             {console.log(date)}
//         </div>
//     );
// };

const APOD = () => {
    const [photoData, setPhotoData] = useState(null);
    const [date, setDate] = useState('');
    const dateInputRef = useRef(null);


    //.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=2021-01-04&concept_tags=True`)

    useEffect(() => {
        // axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}`)
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=2021-01-04`)
            .then(res => {
                setPhotoData(res.data)
                console.log(res.data);
                console.log(res.data.media_type);
            });
    }, []);



    if (!photoData) return <div />;

    return (
        <div className="nasa-apod">

            <label className='nasa-apod-title'>
                Astronomy Picture of the Day
            </label>
            <div>
                <input
                    type="date"
                    onChange={
                        (e) => {
                            setDate(e.target.value);
                            axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${e.target.value}`)
                                .then(res => {
                                    setPhotoData(res.data)
                                    console.log(res.data.media_type);
                                });
                        }
                    }
                    ref={dateInputRef}
                />
                <p>Selected Date: {date}</p>
                {console.log(date)}
            </div>

            <div className='nasa-apod-data'>
                {
                    photoData.media_type = 'image' ? (
                        <img
                            className='photo'
                            src={photoData.url}
                            alt={photoData.title}
                        />
                    ) : (
                        <iframe
                            className='photo'
                            title='space-video'
                            src={photoData.url}
                            typeof='text/html'
                            allow='encrypted-media'
                            frameBorder="0"
                            gesture='media'
                            allowFullscreen
                        />
                    )
                };


                <div className='nasa-apod-data-text'>
                    <label className='nasa-apod-title'>
                        {photoData.title}
                    </label>
                    <p className='nasa-apod-date'>
                        {photoData.date}
                    </p>
                    <p className='nasa-apod-explanation'>
                        <label>Explanation:</label>

                        {photoData.explanation}
                    </p>
                    <p className='nasa-apod-credit'>
                        Image Credit & Copyright: {photoData.copyright}
                    </p>
                </div>
            </div>
        </div>
    );

};


export default APOD;
