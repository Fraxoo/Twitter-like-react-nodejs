import { useState } from "react";
import type { MediaType } from "../../types/MediaType";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

export default function ImageDisplay({ medias }: { medias: MediaType[] }) {
    const spanStyle = {
        padding: '20px',
        background: '#efefef',
        color: '#000000'
    }

    const divStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        height: '400px'
    }


    const [current, setCurrent] = useState(0);


    return (
        <div className="post-slide">

            <Slide
                onChange={(oldIndex, newIndex) => setCurrent(newIndex)}
                autoplay={false}
                arrows={medias.length > 1}
                transitionDuration={200}
                prevArrow={
                    <div
                        className={`arrow left ${current > 0 ? "" : "hidden"}`}
                    >
                        <i className="fa-solid fa-chevron-left"></i>
                    </div>
                }
                nextArrow={
                    <div
                        className={`arrow right ${current < medias.length - 1 ? "" : "hidden"}`}
                    >
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                }
            >
                {medias.map((media, i) => (
                    <div className="each-slide" key={i}>
                        {media.type === "image" ? (
                            <img src={media.url} alt="" style={{ width: "100%" }} />
                        ) : (
                            <video controls style={{ width: "100%" }}>
                                <source src={media.url} type="video/mp4" />
                            </video>
                        )}
                    </div>
                ))}
            </Slide>
        </div>

    )
}