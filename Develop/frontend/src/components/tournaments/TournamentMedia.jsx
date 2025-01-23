import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Galleria } from "primereact/galleria";
import { classNames } from "primereact/utils";
import { useLoaderData, useOutletContext } from "react-router-dom";
import "../../Media.css";
import TournamentComments from "./media/TournamentComments";
import AddTournamentImage from "./media/AddTournamentImage";
import {
  getTournamentComments,
  getTournamentImages,
  postUploadComment,
  postUploadImage,
} from "../../util/api/tournament-media";

export async function action({ request }) {
  const formData = await request.formData();
  const formId = formData.get("formId");

  if (formId === "comment") {
    const data = {
      user: { userId: formData.get("userId") },
      tournament: { tournamentId: formData.get("tournamentId") },
      commentText: formData.get("commentText"),
    };
    try {
      await postUploadComment(data);
    } catch (err) {
      return "Failed to add a comment: " + err.message;
    }
  } else {
    const data = {
      user: { userId: formData.get("userId") },
      tournament: { tournamentId: formData.get("tournamentId") },
      imageContent: formData.get("imageText"),
    };
    if (!data.imageContent) return "Please upload an image.";
    try {
      await postUploadImage(data);
    } catch (err) {
      return "Failed to add an image: " + err.message;
    }
  }
  window.location.reload();
  return null;
}

export async function loader({ params }) {
  const { tournamentId } = params;
  const data = new URLSearchParams();
  data.append("tournamentId", tournamentId);
  const comments = await getTournamentComments(data.toString());
  const images = await getTournamentImages(data.toString());
  if (comments instanceof Response) return comments;
  if (images instanceof Response) return images;
  return {
    comments: comments,
    images: images.map((image) => {
      return {
        itemImageSrc: image.imageContent,
        thumbnailImageSrc: image.imageContent,
        title: `Uploaded by ${image.user.firstName} ${image.user.lastName}`,
        alt: `Image by ${image.user.firstName} ${image.user.lastName}`,
      };
    }),
  };
}

export default function TournamentMedia() {
  const { tournament } = useOutletContext();
  const media = useLoaderData();
  const [images, setImages] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [isAutoPlayActive, setAutoPlayActive] = useState(true);
  const [isFullScreen, setFullScreen] = useState(false);

  const galleria = useRef(null);

  const responsiveOptions = [
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "960px",
      numVisible: 4,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];

  useEffect(() => {
    bindDocumentListeners();

    return () => unbindDocumentListeners();
  }, []);

  useEffect(() => {
    if (galleria && galleria.current)
      setAutoPlayActive(galleria.current.isAutoPlayActive());
  }, [isAutoPlayActive]);

  const onItemChange = (event) => {
    setActiveIndex(event.index);
  };

  const toggleFullScreen = () => {
    if (isFullScreen) {
      closeFullScreen();
    } else {
      openFullScreen();
    }
  };

  const onFullScreenChange = () => {
    setFullScreen((prevState) => !prevState);
  };

  const openFullScreen = () => {
    let elem = document.querySelector(".custom-galleria");
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  const closeFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  const bindDocumentListeners = () => {
    document.addEventListener("fullscreenchange", onFullScreenChange);
    document.addEventListener("mozfullscreenchange", onFullScreenChange);
    document.addEventListener("webkitfullscreenchange", onFullScreenChange);
    document.addEventListener("msfullscreenchange", onFullScreenChange);
  };

  const unbindDocumentListeners = () => {
    document.removeEventListener("fullscreenchange", onFullScreenChange);
    document.removeEventListener("mozfullscreenchange", onFullScreenChange);
    document.removeEventListener("webkitfullscreenchange", onFullScreenChange);
    document.removeEventListener("msfullscreenchange", onFullScreenChange);
  };

  const thumbnailTemplate = (item) => {
    return (
      <div className="grid grid-nogutter justify-content-center">
        <img
          src={item.thumbnailImageSrc}
          alt={item.alt}
          style={{ display: "block" }}
        />
      </div>
    );
  };

  const itemTemplate = (item) => {
    if (isFullScreen) {
      return (
        <img
          src={item.itemImageSrc}
          alt={item.alt}
          className="max-fullscreen"
        />
      );
    }

    return (
      <img
        className="rounded-t-lg image-size object-cover object-center"
        src={item.itemImageSrc}
        alt={item.alt}
        style={{ display: "block" }}
      />
    );
  };

  const renderFooter = () => {
    let autoPlayClassName = classNames("pi", {
      "pi-play": !isAutoPlayActive,
      "pi-pause": isAutoPlayActive,
    });

    let fullScreenClassName = classNames("pi", {
      "pi-window-maximize": !isFullScreen,
      "pi-window-minimize": isFullScreen,
    });

    return (
      <div className="custom-galleria-footer rounded-b-lg">
        {/*
        <Button
          icon="pi pi-list"
          onClick={() => setShowThumbnails((prevState) => !prevState)}
        />
        <Button
          icon={autoPlayClassName}
          onClick={() => {
            if (!isAutoPlayActive) {
              galleria.current.startSlideShow();
              setAutoPlayActive(true);
            } else {
              galleria.current.stopSlideShow();
              setAutoPlayActive(false);
            }
          }}
        />
  */}
        {images && (
          <span className="title-container">
            <span>
              {activeIndex + 1}/{media.images.length}
            </span>
            <span className="title">{media.images[activeIndex].title}</span>
          </span>
        )}
        <Button
          icon={fullScreenClassName}
          onClick={() => toggleFullScreen()}
          className="fullscreen-button"
        />
      </div>
    );
  };

  let footer;
  if (media.images.length > 0) footer = renderFooter();
  const galleriaClassName = classNames("custom-galleria", {
    fullscreen: isFullScreen,
  });

  return (
    <>
      {media && media.images.length == 0 ? (
        <h2>No images uploaded</h2>
      ) : (
        <div className="card galleria-demo flex justify-center">
          <Galleria
            ref={galleria}
            value={media.images}
            activeIndex={activeIndex}
            onItemChange={onItemChange}
            showThumbnails={showThumbnails}
            showItemNavigators
            showItemNavigatorsOnHover
            numVisible={5}
            circular
            transitionInterval={3000}
            responsiveOptions={responsiveOptions}
            item={itemTemplate}
            thumbnail={thumbnailTemplate}
            footer={footer}
            style={{ maxWidth: "640px" }}
            className={galleriaClassName}
          />
        </div>
      )}

      <AddTournamentImage />
      <TournamentComments comments={media.comments} className="text-left" />
    </>
  );
}
