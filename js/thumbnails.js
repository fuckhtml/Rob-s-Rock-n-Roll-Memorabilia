'use strict';

const initPage = () => {

  const renderDetails = (itemID, description) => {
    const detailsPane = document.querySelector('#detailsPane');
    detailsPane.querySelector('img').src = `images/${itemID}-detail.jpg`;
    detailsPane.querySelector('#description').innerHTML = `<p>${description}</p>`;
  }

  const thumbnailPaneOnClickHandler = (event) => {
    if (event.target.tagName === 'IMG') {
      const itemID = event.target.id;

      let request = new XMLHttpRequest();
      request.addEventListener('readystatechange', function() {
        if (request.readyState === 4 && request.status === 200) {
          renderDetails(itemID, request.responseText);
        }
      })
      request.open('GET', `getDetails.php?ImageID=${itemID}`);
      request.send();
    }
  }

  // Main Logic

  const thumbnailPane = document.querySelector('#thumbnailPane');
  thumbnailPane.addEventListener('click', thumbnailPaneOnClickHandler);
}

window.addEventListener('load', initPage);
